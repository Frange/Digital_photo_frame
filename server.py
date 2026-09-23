#!/usr/bin/env python3

import http.server
import socketserver
import urllib.request
import urllib.error
import json
import threading
import time
import os
from urllib.parse import urlparse, parse_qs, unquote

PORT = 8080
IMMICH_URL = "http://192.168.1.11:2283"
IMMICH_API_KEY = "dtB86uMq52qFuuvKOKboLdz6JAbZNkXPlyBLtakKgw"
IMMICH_ALBUM_ID = "425241e5-16a8-4862-94c9-ec07f5a68565"
IMMICH_REFRESH_SECONDS = 20
CATALOG_FILE = "immich_data.json"
WEB_ROOT = "/home/pi/web"

catalog_lock = threading.Lock()
immich_catalog = {"assets": [], "updatedAt": None, "error": None}

def log(message):
    print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] {message}", flush=True)

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
    take = 250  # Límite por página que acepta Immich

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
        except urllib.error.HTTPError as error:
            error_body = ""
            try:
                error_body = error.read().decode("utf-8", errors="replace")
            except Exception:
                pass
            log(f"IMMICH_SRV ERROR HTTP {error.code}: {error_body}")
            raise RuntimeError(f"HTTP {error.code}: {error_body}")
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
        log(f"IMMICH_SRV: Página {page} procesada. Total acumulado: {len(all_raw_items)} elementos...")

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

def sync_immich():
    global immich_catalog
    while True:
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
            log(f"IMMICH_SRV: Sincronización completada ({len(assets)} elementos guardados).")
        except Exception as error:
            error_message = str(error)
            log(f"IMMICH_SRV ERROR en bucle de sinc: {error_message}")
            with catalog_lock:
                immich_catalog["error"] = error_message
        time.sleep(IMMICH_REFRESH_SECONDS)

def clean_and_prepare_catalog():
    if os.path.exists(CATALOG_FILE):
        try:
            os.remove(CATALOG_FILE)
            log("IMMICH_SRV: Archivo json anterior eliminado correctamente.")
        except Exception as error:
            log(f"IMMICH_SRV ERROR al eliminar json anterior: {error}")

def get_immich_thumbnail(asset_id):
    return immich_request(f"/api/assets/{asset_id}/original", method="GET")

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

        if path == "/api/immich/photos":
            with catalog_lock:
                response = dict(immich_catalog)
                response["assets"] = list(immich_catalog.get("assets", []))
            log(f"API: Sirviendo /api/immich/photos con {len(response['assets'])} assets.")
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
            except urllib.error.HTTPError as error:
                log(f"IMMICH THUMBNAIL ERROR {asset_id}: HTTP {error.code}")
                self.send_error(error.code, "Miniatura no disponible en Immich")
            except Exception as error:
                log(f"THUMBNAIL EXCEPTION {asset_id}: {error}")
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
    log("==========================================")
    log("    SERVIDOR DASHBOARD + IMMICH (ÁLBUM)")
    log("==========================================")
    log(f"Web: {WEB_ROOT} | Puerto: {PORT}")

    clean_and_prev_catalog = clean_and_prepare_catalog()
    threading.Thread(target=sync_immich, daemon=True).start()

    with ReusableThreadingTCPServer(("", PORT), DashboardHandler) as httpd:
        log(f"Servidor escuchando en http://0.0.0.0:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            log("Servidor detenido por el usuario.")