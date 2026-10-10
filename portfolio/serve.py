"""Run the portfolio locally with one command:

    python serve.py          (Windows)
    python3 serve.py         (macOS / Linux)

Optional: pass a port number, e.g. `python serve.py 3000`. Stop with Ctrl+C.
"""
import http.server
import os
import socketserver
import sys
import threading
import webbrowser

ROOT = os.path.dirname(os.path.abspath(__file__))
START_PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def log_message(self, format, *args):
        sys.stdout.write("  %s\n" % (format % args))


def start_server(port):
    # Try the requested port, then the next few if it is busy.
    for candidate in range(port, port + 20):
        try:
            socketserver.TCPServer.allow_reuse_address = True
            return socketserver.TCPServer(("127.0.0.1", candidate), QuietHandler), candidate
        except OSError:
            continue
    sys.exit("No free port found. Close other servers or pass a different port.")


def main():
    server, port = start_server(START_PORT)
    url = f"http://localhost:{port}"
    print(f"\nPortfolio running at {url}\nPress Ctrl+C to stop.\n")
    threading.Timer(0.8, lambda: webbrowser.open(url)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
