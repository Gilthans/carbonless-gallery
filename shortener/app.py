"""The HTTP API: create a short link, follow one."""

from flask import Flask, abort, jsonify, redirect, request

from shortener.codes import is_valid, new_code
from shortener.store import Store

app = Flask(__name__)
store = Store()


@app.post("/links")
def create_link():
    url = (request.get_json(silent=True) or {}).get("url", "")
    if not url.startswith(("http://", "https://")):
        abort(400, "url must be http(s)")
    code = new_code()
    while store.get(code) is not None:
        code = new_code()
    store.put(code, url)
    return jsonify(code=code, url=url), 201


@app.get("/<code>")
def follow(code: str):
    if not is_valid(code):
        abort(404, "no such link")
    url = store.get(code)
    if url is None:
        abort(404)
    return redirect(url, code=302)


@app.get("/healthz")
def health():
    return {"ok": True, "links": store.count()}
