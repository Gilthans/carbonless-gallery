"""WSGI middleware: one bucket per client IP."""

import math

from ratelimit.bucket import TokenBucket

DEFAULT_CAPACITY = 20
DEFAULT_RATE = 5.0


class RateLimitMiddleware:
    def __init__(self, app, capacity: int = DEFAULT_CAPACITY, rate: float = DEFAULT_RATE):
        self.app = app
        self.capacity = capacity
        self.rate = rate
        self.buckets: dict[str, TokenBucket] = {}

    def client_key(self, environ) -> str:
        forwarded = environ.get("HTTP_X_FORWARDED_FOR", "")
        if forwarded:
            return forwarded.split(",")[0].strip()
        return environ.get("REMOTE_ADDR", "unknown")

    def __call__(self, environ, start_response):
        client = self.client_key(environ)
        bucket = self.buckets.get(client)
        if bucket is None:
            bucket = self.buckets[client] = TokenBucket(self.capacity, self.rate)
        if not bucket.take():
            retry_after = max(1, math.ceil(bucket.wait_time()))
            start_response(
                "429 Too Many Requests",
                [("Content-Type", "text/plain"), ("Retry-After", str(retry_after))],
            )
            return [b"rate limit exceeded\n"]
        return self.app(environ, start_response)
