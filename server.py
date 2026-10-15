#!/usr/bin/env python3

import http.server
import socketserver
import urllib.request
import urllib.error
import json
import threading
import time
import os
import queue
from urllib.parse import urlparse, parse_qs, unquote
import RPi.GPIO as GPIO

PORT = 8080
IMMICH_URL = "http://192.168.1.11:2283"
IMMICH_API_KEY = "r9AlV9ZMTloCAfyw8oWsnmGKi6UZh97OYexIAOfk"
IMMICH_ALBUM_ID = "59037446-f94f-48a9-bd30-d78dcc444de7"
CATALOG_FILE = "immich_data.json"
WEB_ROOT = "/home/pi/web"

# Definición de Pines GPIO (Raspberry Pi Zero)
PIN_BTN_PREV = 23   # Pulsador Anterior
PIN_BTN_NEXT = 24   # Pulsador Siguiente
PIN_SWITCH = 25     # Interruptor Immich/Local

catalog_lock = threading.Lock()
immich_catalog = {"assets": [], "updatedAt": None, "error": None}

# Cola para transmitir eventos en tiempo real a los clientes web (SSE)
sse_clients = []
sse_lock = threading.Lock()

def log(message):
    print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] {message}", flush=True)

def broadcast_event(event_type, data=""):
    with sse_lock:
        msg = f"event: {event_type}\ndata: {data}\n\n"
        for q in sse_clients:
            try:
                q.put_nowait(msg)
            except Exception:
                pass

def immich_request(path, method="GET", body=None):
    url = IMMICH_URL.rstrip("/") + path
    headers = {"x-api-key": IMMICH_API_KEY, "Accept": "application/json"}
    data = None
    if body is not None:
        data = json.dumps(body).encode("utf-8")
        headers["Content-Type"] = "application/json"
    request = urllib.request.Request(url, data=data, headers=headers, method=method)
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.status, response.headers.get("Content-Type", ""), response.read()

def search_immich():
    log(f"IMMICH_SRV: Consultando assets del álbum {IMMICH_ALBUM_ID} via search/metadata con paginación...")
    all_raw_items = []
    page = 1
    take = 250

    while True:
        body = {
            "page": page,
            "take": take,
            "albumIds": [IMMICH_ALBUM_ID],
            "isVisible": True
        }
        try:
            status, _, raw_data = immich_request("/api/search/metadata", method="POST", body=body)
            data = json.loads(raw_data.decode("utf-8"))
        except Exception as error:
            log(f"IMMICH_SRV ERROR CONEXIÓN: {error}")
            raise RuntimeError(f"No se pudo consultar Immich: {error}")

        raw_items = []
        if isinstance(data, dict):
            assets_container = data.get("assets", [])
            if isinstance(assets_container, dict):
                raw_items = assets_container.get("items", [])
            elif isinstance(assets_container, list):
                raw_items = assets_container

        if not raw_items:
            break

        all_raw_items.extend(raw_items)
        if len(raw_items) < take:
            break
        page += 1

    assets = []
    for item in all_raw_items:
        if isinstance(item, dict) and item.get("id"):
            asset_type = item.get("type", "IMAGE")
            assets.append({
                "id": item.get("id"),
                "type": asset_type if asset_type in ("IMAGE", "VIDEO") else "IMAGE",
                "originalFileName": item.get("originalFileName", "Immich Asset")
            })

    log(f"IMMICH_SRV: Total elementos procesados del álbum: {len(assets)}")
    return assets

def load_initial_catalog():
    global immich_catalog
    try:
        assets = search_immich()
        catalog = {"assets": assets, "updatedAt": time.strftime("%Y-%m-%dT%H:%M:%S"), "error": None}
        with catalog_lock:
            immich_catalog = catalog
            try:
                with open(CATALOG_FILE, "w", encoding="utf-8") as file:
                    json.dump(catalog, file, ensure_ascii=False, indent=2)
            except Exception as error:
                log(f"IMMICH_SRV ERROR guardando catálogo en disco: {error}")
        log(f"IMMICH_SRV: Carga inicial completada ({len(assets)} elementos listos).")
    except Exception as error:
        error_message = str(error)
        log(f"IMMICH_SRV ERROR en carga inicial: {error_message}")
        with catalog_lock:
            immich_catalog["error"] = error_message

def clean_and_prepare_catalog():
    if os.path.exists(CATALOG_FILE):
        try:
            os.remove(CATALOG_FILE)
            log("IMMICH_SRV: Archivo json anterior eliminado correctamente.")
        except Exception as error:
            log(f"IMMICH_SRV ERROR al eliminar json anterior: {error}")

def get_immich_thumbnail(asset_id):
    return immich_request(f"/api/assets/{asset_id}/thumbnail?size=preview", method="GET")

# --- HILO DE MONITOREO DE GPIO ---
def setup_gpio():
    GPIO.setmode(GPIO.BCM)
    GPIO.setwarnings(False)
    GPIO.setup(PIN_BTN_PREV, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.setup(PIN_BTN_NEXT, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.setup(PIN_SWITCH, GPIO.IN, pull_up_down=GPIO.PUD_UP)

def gpio_monitor_loop():
    setup_gpio()
    log("GPIO: Monitor de hardware iniciado en segundo plano.")
    
    last_switch_state = GPIO.input(PIN_SWITCH)
    
    while True:
        try:
            # 1. Control del Interruptor (Immich / Local)
            current_switch_state = GPIO.input(PIN_SWITCH)
            if current_switch_state != last_switch_state:
                time.sleep(0.05)
                if GPIO.input(PIN_SWITCH) == current_switch_state:
                    last_switch_state = current_switch_state
                    mode_name = "LOCAL" if current_switch_state == GPIO.HIGH else "IMMICH"
                    log(f"\nGPIO: Cambio de interruptor detectado -> Modo {mode_name}\n")
                    broadcast_event("mode_change", mode_name)

            # 2. Pulsador Anterior (GPIO 23)
            if GPIO.input(PIN_BTN_PREV) == GPIO.LOW:
                log(f"\nGPIO: Pulsador ANTERIOR presionado.\n")
                broadcast_event("btn_prev")
                time.sleep(0.3)

            # 3. Pulsador Siguiente (GPIO 24)
            if GPIO.input(PIN_BTN_NEXT) == GPIO.LOW:
                log(f"\nGPIO: Pulsador SIGUIENTE presionado.\n")
                broadcast_event("btn_next")
                time.sleep(0.3)

            time.sleep(0.05)
        except Exception as e:
            log(f"\nGPIO ERROR en bucle: {e}\n")
            time.sleep(1)

class DashboardHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=WEB_ROOT, **kwargs)

    def log_message(self, format, *args):
        message = format % args
        if "JS_LOG=" in message:
            log("NAVEGADOR_LOG -> " + message)
            return
        log("HTTP_REQ -> " + message)

    def send_json(self, data, status=200):
        try:
            payload = json.dumps(data, ensure_ascii=False).encode("utf-8")
            self.send_response(status)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(payload)))
            self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
            self.end_headers()
            self.wfile.write(payload)
        except Exception as e:
            log(f"IMMICH_SRV ERROR en send_json: {e}")
            self.send_error(500, str(e))

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path.rstrip("/")

        # Endpoint SSE para eventos físicos en tiempo real
        if path == "/api/events":
            self.send_response(200)
            self.send_header("Content-Type", "text/event-stream")
            self.send_header("Cache-Control", "no-cache")
            self.send_header("Connection", "keep-alive")
            self.end_headers()
            
            q = queue.Queue()
            with sse_lock:
                sse_clients.append(q)
            
            try:
                while True:
                    try:
                        msg = q.get(timeout=20)
                        self.wfile.write(msg.encode("utf-8"))
                        self.wfile.flush()
                    except queue.Empty:
                        self.wfile.write(b": ping\n\n")
                        self.wfile.flush()
            except Exception:
                pass
            finally:
                with sse_lock:
                    if q in sse_clients:
                        sse_clients.remove(q)
            return

        if path == "/api/hardware/status":
            try:
                is_local = GPIO.input(PIN_SWITCH) == GPIO.HIGH
                self.send_json({"mode": "LOCAL" if is_local else "IMMICH"})
            except Exception:
                self.send_json({"mode": "IMMICH"})
            return

        if path == "/api/immich/photos":
            with catalog_lock:
                response = dict(immich_catalog)
                response["assets"] = list(immich_catalog.get("assets", []))
            self.send_json(response)
            return

        if path == "/api/immich/status":
            with catalog_lock:
                response = {
                    "ok": immich_catalog.get("error") is None,
                    "count": len(immich_catalog.get("assets", [])),
                    "updatedAt": immich_catalog.get("updatedAt"),
                    "error": immich_catalog.get("error"),
                    "albumId": IMMICH_ALBUM_ID
                }
            self.send_json(response)
            return

        if path.startswith("/api/immich/thumbnail"):
            asset_id = unquote(parsed.path[len("/api/immich/thumbnail/"):])
            if not asset_id:
                self.send_error(400, "Falta asset ID")
                return
            try:
                status, content_type, data = get_immich_thumbnail(asset_id)
                self.send_response(status)
                content_type = content_type.split(";")[0] if content_type else "image/jpeg"
                self.send_header("Content-Type", content_type)
                self.send_header("Content-Length", str(len(data)))
                self.send_header("Cache-Control", "public, max-age=86400")
                self.end_headers()
                self.wfile.write(data)
            except Exception as error:
                self.send_error(500, str(error))
            return

        query = parse_qs(parsed.query)
        if "JS_LOG" in query:
            log("JS_REMOTE -> " + query["JS_LOG"][0])
            self.send_response(204)
            self.end_headers()
            return

        return super().do_GET()

class ReusableThreadingTCPServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True

if __name__ == "__main__":
    os.chdir(WEB_ROOT)
    log(f"\n\n==========================================")
    log("    SERVIDOR DASHBOARD + HARDWARE GPIO")
    log("==========================================")
    log(f"Web: {WEB_ROOT} | Puerto: {PORT}")

    # Inicializamos los GPIOs de forma temprana para leer el interruptor al arrancar
    try:
        GPIO.setmode(GPIO.BCM)
        GPIO.setwarnings(False)
        GPIO.setup(PIN_SWITCH, GPIO.IN, pull_up_down=GPIO.PUD_UP)
        initial_switch = GPIO.input(PIN_SWITCH)
    except Exception:
        initial_switch = GPIO.HIGH

    # Ajusta esta lógica según el estado físico en el que quieras que cargue Immich (HIGH o LOW)
    is_immich_mode = (initial_switch == GPIO.LOW)

    if is_immich_mode:
        log("INTERRUPTOR: Posición detectada en MODO IMMICH. Sincronizando álbum...")
        clean_and_prepare_catalog()
        load_initial_catalog()
    else:
        log("INTERRUPTOR: Posición detectada en MODO LOCAL. Omitiendo sincronización con Immich.")

    gpio_thread = threading.Thread(target=gpio_monitor_loop, daemon=True)
    gpio_thread.start()

    with ReusableThreadingTCPServer(("", PORT), DashboardHandler) as httpd:
        log(f"Servidor escuchando en http://0.0.0.0:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            GPIO.cleanup()
            log("Servidor detenido por el usuario.")