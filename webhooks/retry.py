"""Retry policies for outgoing webhook deliveries."""

from __future__ import annotations

import random
import time
from dataclasses import dataclass, field
from typing import Callable, Iterable

DEFAULT_MAX_ATTEMPTS = 5
DEFAULT_BASE_DELAY = 0.5
DEFAULT_MAX_DELAY = 60.0

RETRYABLE_STATUS = {408, 425, 429, 500, 502, 503, 504}


class DeliveryError(Exception):
    """Raised when a delivery fails and should not be retried."""

    def __init__(self, status: int, body: str) -> None:
        super().__init__(f"delivery failed with HTTP {status}")
        self.status = status
        self.body = body


class RetryableError(Exception):
    """Raised when a delivery fails in a way worth trying again."""

    def __init__(self, status: int | None, reason: str) -> None:
        super().__init__(reason)
        self.status = status
        self.reason = reason


@dataclass
class Attempt:
    number: int
    started_at: float
    status: int | None = None
    error: str | None = None

    @property
    def succeeded(self) -> bool:
        return self.status is not None and 200 <= self.status < 300


@dataclass
class RetryPolicy:
    max_attempts: int = DEFAULT_MAX_ATTEMPTS
    base_delay: float = DEFAULT_BASE_DELAY
    max_delay: float = DEFAULT_MAX_DELAY
    jitter: bool = True
    retry_on: set[int] = field(default_factory=lambda: set(RETRYABLE_STATUS))

    def should_retry(self, attempt: Attempt) -> bool:
        if attempt.number >= self.max_attempts:
            return False
        if attempt.status is None:
            return True
        return attempt.status in self.retry_on

    def delay_for(self, attempt_number: int) -> float:
        # Exponential backoff: 1s, 2s, 4s, 8s, ... capped at max_delay.
        delay = self.base_delay * (2 ** attempt_number)
        delay = min(delay, self.max_delay)
        if self.jitter:
            # Equal jitter: never less than half the backoff.
            delay = delay / 2 + random.uniform(0, delay / 2)
        return delay

    def delays(self) -> Iterable[float]:
        for number in range(1, self.max_attempts):
            yield self.delay_for(number)


def parse_retry_after(header: str | None) -> float | None:
    """Read a Retry-After header given in seconds; dates are ignored."""
    if header is None:
        return None
    header = header.strip()
    if not header.isdigit():
        return None
    return float(header)


@dataclass
class DeliveryLog:
    endpoint: str
    attempts: list[Attempt] = field(default_factory=list)

    def record(self, attempt: Attempt) -> None:
        self.attempts.append(attempt)

    @property
    def last(self) -> Attempt | None:
        return self.attempts[-1] if self.attempts else None

    @property
    def delivered(self) -> bool:
        last = self.last
        return last is not None and last.succeeded

    def summary(self) -> str:
        if not self.attempts:
            return f"{self.endpoint}: not attempted"
        outcome = "delivered" if self.delivered else "failed"
        return f"{self.endpoint}: {outcome} after {len(self.attempts)} attempt(s)"


def deliver_with_retries(
    endpoint: str,
    send: Callable[[], tuple[int, str, dict[str, str]]],
    policy: RetryPolicy | None = None,
    sleep: Callable[[float], None] = time.sleep,
    clock: Callable[[], float] = time.monotonic,
) -> DeliveryLog:
    policy = policy or RetryPolicy()
    log = DeliveryLog(endpoint)
    number = 0
    while True:
        number += 1
        attempt = Attempt(number=number, started_at=clock())
        try:
            status, body, headers = send()
        except OSError as exc:
            attempt.error = str(exc)
            log.record(attempt)
            if not policy.should_retry(attempt):
                raise RetryableError(None, f"giving up: {exc}") from exc
            sleep(policy.delay_for(number))
            continue
        attempt.status = status
        log.record(attempt)
        if attempt.succeeded:
            return log
        if status not in policy.retry_on:
            raise DeliveryError(status, body)
        if not policy.should_retry(attempt):
            raise RetryableError(status, f"giving up after {number} attempts")
        wait = parse_retry_after(headers.get("Retry-After"))
        sleep(wait if wait is not None else policy.delay_for(number))


def describe(policy: RetryPolicy) -> str:
    steps = ", ".join(f"{d:.1f}s" for d in policy.delays())
    return f"up to {policy.max_attempts} attempts, waits of at most {steps}"
