"""Where links live. In memory for now; swap for Redis in production."""

import threading


class Store:
    def __init__(self) -> None:
        self._links: dict[str, str] = {}
        self._lock = threading.Lock()

    def get(self, code: str) -> str | None:
        return self._links.get(code)

    def put(self, code: str, url: str) -> None:
        with self._lock:
            self._links[code] = url

    def count(self) -> int:
        return len(self._links)
