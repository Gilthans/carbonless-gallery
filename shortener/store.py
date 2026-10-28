"""Where links live. In memory for now; swap for Redis in production."""

import threading
import time


class Store:
    def __init__(self) -> None:
        self._links: dict[str, tuple[str, float | None]] = {}
        self._lock = threading.Lock()

    def get(self, code: str) -> str | None:
        entry = self._links.get(code)
        if entry is None:
            return None
        url, expires_at = entry
        if expires_at is not None and time.time() >= expires_at:
            return None
        return url

    def put(self, code: str, url: str, ttl_seconds: int | None = None) -> None:
        expires_at = None if ttl_seconds is None else time.time() + ttl_seconds
        with self._lock:
            self._links[code] = (url, expires_at)
