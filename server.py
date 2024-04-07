import http.server
import socketserver

port = 8080
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", port), Handler) as httpd:
    print("Server started successfully!")
    print(f"Port: {port}")
    httpd.serve_forever()
