"""WSGI middleware: one bucket per client IP."""

from ratelimit.bucket import TokenBucket

DEFAULT_CAPACITY = 20
DEFAULT_RATE = 5.0


class RateLimitMiddleware:
    def __init__(self, app, capacity: int = DEFAULT_CAPACITY, rate: float = DEFAULT_RATE):
        self.app = app
        self.capacity = capacity
        self.rate = rate
        self.buckets: dict[str, TokenBucket] = {}

    def __call__(self, environ, start_response):
        client = environ.get("REMOTE_ADDR", "unknown")
        bucket = self.buckets.setdefault(client, TokenBucket(self.capacity, self.rate))
        if not bucket.take():
            start_response("429 Too Many Requests", [("Content-Type", "text/plain")])
            return [b"slow down\n"]
        return self.app(environ, start_response)
