"""A token bucket: `capacity` tokens, refilled at `rate` tokens per second."""

import threading
import time


class TokenBucket:
    def __init__(self, capacity: int, rate: float) -> None:
        if capacity <= 0 or rate <= 0:
            raise ValueError("capacity and rate must be positive")
        self.capacity = capacity
        self.rate = rate
        self.tokens = float(capacity)
        self.updated = time.monotonic()
        self._lock = threading.Lock()

    def _refill(self) -> None:
        now = time.monotonic()
        elapsed = now - self.updated
        self.tokens = min(self.capacity, self.tokens + elapsed * self.rate)
        self.updated = now

    def take(self, n: int = 1) -> bool:
        """Take `n` tokens if there are enough; False (and take none) if not."""
        if n > self.capacity:
            raise ValueError(f"cannot take {n} tokens from a bucket of {self.capacity}")
        with self._lock:
            self._refill()
            if self.tokens >= n:
                self.tokens -= n
                return True
            return False

    def wait_time(self, n: int = 1) -> float:
        """Seconds until `n` tokens will be available."""
        self._refill()
        missing = n - self.tokens
        return max(0.0, missing / self.rate)
