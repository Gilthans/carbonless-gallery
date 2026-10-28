"""Short codes for links: random, URL-safe, and never ambiguous to read."""

import secrets

# No 0/O, 1/l/I: codes get read aloud and typed from screenshots.
ALPHABET = "23456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
DEFAULT_LENGTH = 7


def new_code(length: int = DEFAULT_LENGTH) -> str:
    return "".join(secrets.choice(ALPHABET) for _ in range(length))


def is_valid(code: str) -> bool:
    return 4 <= len(code) <= 16 and all(ch in ALPHABET for ch in code)
