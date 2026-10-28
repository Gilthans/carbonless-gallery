from shortener.store import Store


def test_expired_links_are_gone(monkeypatch):
    now = [1000.0]
    monkeypatch.setattr("shortener.store.time.time", lambda: now[0])
    store = Store()
    store.put("abc2345", "https://example.com", ttl_seconds=60)
    assert store.get("abc2345") == "https://example.com"
    now[0] += 60
    assert store.get("abc2345") is None


def test_links_without_ttl_never_expire():
    store = Store()
    store.put("abc2345", "https://example.com")
    assert store.get("abc2345") == "https://example.com"
