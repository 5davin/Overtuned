from __future__ import annotations

import mimetypes
import os
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any
from urllib.parse import urlparse


BASE_DIR = Path(__file__).resolve().parent
CAR_CARE_DIR = BASE_DIR / "static" / "car-care"


class CarCareHandler(BaseHTTPRequestHandler):
    server_version = "SiagaMobil/0.1"

    def do_GET(self) -> None:
        parsed = urlparse(self.path)

        if parsed.path == "/health":
            self.respond_bytes(HTTPStatus.OK, b'{"ok": true}', "application/json; charset=utf-8")
            return

        if parsed.path in {"/", ""}:
            self.serve_file(CAR_CARE_DIR / "index.html", "text/html; charset=utf-8")
            return

        asset_map = {
            "/app.js": CAR_CARE_DIR / "app.js",
            "/data.js": CAR_CARE_DIR / "data.js",
            "/styles.css": CAR_CARE_DIR / "styles.css",
            "/sw.js": CAR_CARE_DIR / "sw.js",
            "/manifest.webmanifest": CAR_CARE_DIR / "manifest.webmanifest",
        }
        asset = asset_map.get(parsed.path)
        if asset:
            self.serve_file(asset)
            return

        # Keep the lesson app SPA-friendly for future nested paths.
        if parsed.path.startswith("/") and "." not in parsed.path.rsplit("/", 1)[-1]:
            self.serve_file(CAR_CARE_DIR / "index.html", "text/html; charset=utf-8")
            return

        self.respond_bytes(HTTPStatus.NOT_FOUND, b"Not found.", "text/plain; charset=utf-8")

    def serve_file(self, filepath: Path, content_type: str | None = None) -> None:
        if not filepath.exists() or not filepath.is_file():
            self.respond_bytes(HTTPStatus.NOT_FOUND, b"Not found.", "text/plain; charset=utf-8")
            return

        body = filepath.read_bytes()
        guessed_type = content_type or mimetypes.guess_type(filepath.name)[0] or "application/octet-stream"
        self.respond_bytes(HTTPStatus.OK, body, guessed_type)

    def respond_bytes(self, status: int, body: bytes, content_type: str) -> None:
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        if content_type.startswith("text/") or "javascript" in content_type or "json" in content_type or "manifest" in content_type:
            self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format: str, *args: Any) -> None:  # noqa: A003
        return


def main() -> None:
    host = os.environ.get("HOST", "127.0.0.1")
    port = int(os.environ.get("PORT", "8010"))
    server = ThreadingHTTPServer((host, port), CarCareHandler)
    print(f"SiagaMobil server running at http://{host}:{port}")
    server.serve_forever()


if __name__ == "__main__":
    main()
