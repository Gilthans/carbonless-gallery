"""The HTTP API: create a short link, follow one."""

from flask import Flask, abort, jsonify, redirect, request

from shortener.codes import is_valid, new_code
from shortener.store import Store

app = Flask(__name__)
store = Store()


@app.post("/links")
def create_link():
    body = request.get_json(silent=True) or {}
    url = body.get("url", "")
    if not url.startswith(("http://", "https://")):
        abort(400, "url must be http(s)")
    ttl = body.get("ttl_seconds")
    if ttl is not None and (not isinstance(ttl, int) or ttl <= 0):
        abort(400, "ttl_seconds must be a positive integer")
    code = new_code()
    while store.get(code) is not None:
        code = new_code()
    store.put(code, url, ttl_seconds=ttl)
    return jsonify(code=code, url=url, ttl_seconds=ttl), 201


@app.get("/<code>")
def follow(code: str):
    if not is_valid(code):
        abort(404)
    url = store.get(code)
    if url is None:
        abort(404)
    return redirect(url, code=302)


@app.get("/healthz")
def health():
    return {"ok": True}
