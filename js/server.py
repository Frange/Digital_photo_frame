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
IMMICH_URL = "http://192.168.1.8:2283"
IMMICH_API_KEY = "IMk2jvDwBiQblf8zF79gAGN0LjlqMV0UVguAtkI"
IMMICH_TAG_ID = "d244172f-3a27-48da-bbe1-a45f22a38069"
IMMICH_ALBUM_ID = ""
IMMICH_TAKE = 1000
IMMICH_REFRESH_SECONDS = 600
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
    log("IMMICH: Consultando catálogo...")
    body = {"take": IMMICH_TAKE}
    if IMMICH_TAG_ID:
        body["tagIds"] = [IMMICH_TAG_ID]
    if IMMICH_ALBUM_ID:
        body["albumId"] = IMMICH_ALBUM_ID
    try:
        status, _, raw_data = immich_request("/api/search/metadata", method="POST", body=body)
        data = json.loads(raw_data.decode("utf-8"))
    except urllib.error.HTTPError as error:
        error_body = ""
        try:
            error_body = error.read().decode("utf-8", errors="replace")
        except Exception:
            pass
        raise RuntimeError(f"HTTP {error.code}: {error_body}")
    except Exception as error:
        raise RuntimeError(f"No se pudo consultar Immich: {error}")

    raw_items = []
    if isinstance(data, dict):
        assets = data.get("assets")
        if isinstance(assets, dict):
            raw_items = assets.get("items", []) if isinstance(assets.get("items"), list) else []
        elif isinstance(assets, list):
            raw_items = assets
    elif isinstance(data, list):
        raw_items = data

    assets = []
    for item in raw_items:
        if isinstance(item, dict) and item.get("type") in ("IMAGE", "VIDEO") and item.get("id"):
            assets.append({
                "id": item.get("id"),
                "type": item.get("type"),
                "originalFileName": item.get("originalFileName", "Immich Asset")
            })
    log(f"IMMICH: {len(assets)} assets encontrados.")
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
                    log(f"ERROR guardando catálogo: {error}")
            log(f"IMMICH: Catálogo actualizado ({len(assets)} elementos).")
        except Exception as error:
            error_message = str(error)
            log(f"IMMICH ERROR: {error_message}")
            with catalog_lock:
                immich_catalog["error"] = error_message
        time.sleep(IMMICH_REFRESH_SECONDS)

def load_previous_catalog():
    global immich_catalog
    if not os.path.exists(CATALOG_FILE):
        return
    try:
        with open(CATALOG_FILE, "r", encoding="utf-8") as file:
            data = json.load(file)
        if isinstance(data, dict):
            with catalog_lock:
                immich_catalog = data
            log("IMMICH: Catálogo anterior cargado.")
    except Exception as error:
        log(f"ERROR cargando catálogo anterior: {error}")

def get_immich_thumbnail(asset_id):
    return immich_request(f"/api/assets/{asset_id}/thumbnail?size=thumbnail", method="GET")

class DashboardHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=WEB_ROOT, **kwargs)

    def log_message(self, format, *args):
        message = format % args
        if "JS_LOG=" in message:
            log("NAVEGADOR: " + message)
            return
        log("HTTP: " + message)

    def send_json(self, data, status=200):
        payload = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(payload)))
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.end_headers()
        self.wfile.write(payload)

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

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
                    "tagId": IMMICH_TAG_ID
                }
            self.send_json(response)
            return

        if path == "/api/immich/refresh":
            try:
                assets = search_immich()
                catalog = {"assets": assets, "updatedAt": time.strftime("%Y-%m-%dT%H:%M:%S"), "error": None}
                with catalog_lock:
                    immich_catalog = catalog
                with open(CATALOG_FILE, "w", encoding="utf-8") as file:
                    json.dump(catalog, file, ensure_ascii=False, indent=2)
                self.send_json({"ok": True, "count": len(assets)})
            except Exception as error:
                self.send_json({"ok": False, "error": str(error)}, status=500)
            return

        if path.startswith("/api/immich/thumbnail/"):
            asset_id = unquote(path[len("/api/immich/thumbnail/"):])
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
                self.send_error(error.code, "Immich no pudo devolver la miniatura")
            except Exception as error:
                log(f"THUMBNAIL ERROR {asset_id}: {error}")
                self.send_error(500, str(error))
            return

        query = parse_qs(parsed.query)
        if "JS_LOG" in query:
            log("NAVEGADOR -> " + query["JS_LOG"][0])
            self.send_response(204)
            self.end_headers()
            return

        return super().do_GET()

if __name__ == "__main__":
    os.chdir(WEB_ROOT)
    log("==========================================")
    log("   SERVIDOR DASHBOARD + IMMICH")
    log("==========================================")
    log(f"Web: {WEB_ROOT} | Puerto: {PORT}")
    
    load_previous_catalog()
    threading.Thread(target=sync_immich, daemon=True).start()

    with socketserver.ThreadingTCPServer(("", PORT), DashboardHandler) as httpd:
        httpd.allow_reuse_address = True
        log(f"Servidor escuchando en http://0.0.0.0:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            log("Servidor detenido.")