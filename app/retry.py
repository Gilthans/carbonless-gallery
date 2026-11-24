"""Retry a flaky call with backoff."""

import random
import time

DEFAULT_ATTEMPTS = 5
DEFAULT_DELAY = 0.5
MAX_DELAY = 8.0


def backoff(attempt: int, delay: float = DEFAULT_DELAY) -> float:
    """How long to wait before `attempt` (0-based)."""
    wait = delay * (2 ** attempt)
    return min(wait, MAX_DELAY)


def jitter(wait: float) -> float:
    """Spread retries out so they don't all land together."""
    return wait * random.uniform(0.8, 1.2)


def retry(call, attempts: int = DEFAULT_ATTEMPTS, delay: float = DEFAULT_DELAY):
    """Call `call()` until it succeeds or `attempts` run out."""
    last = None
    for attempt in range(attempts):
        try:
            return call()
        except ConnectionError as error:
            last = error
            time.sleep(jitter(backoff(attempt, delay)))
    raise last


def retry_quietly(call, attempts: int = DEFAULT_ATTEMPTS):
    """As retry(), but None instead of raising."""
    try:
        return retry(call, attempts)
    except ConnectionError:
        return None
