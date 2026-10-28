"""Small string helpers shared by the parsers and the reports."""

import re
import unicodedata

_WHITESPACE = re.compile(r"\s+")


def normalise_payee(raw: str) -> str:
    """Collapse whitespace, strip accents and upper-case a payee name.

    Banks print the same merchant in many ways ("Café Nero  LONDON",
    "CAFE NERO LONDON"); this makes them compare equal.
    """
    decomposed = unicodedata.normalize("NFKD", raw)
    ascii_only = "".join(ch for ch in decomposed if not unicodedata.combining(ch))
    return _WHITESPACE.sub(" ", ascii_only).strip().upper()


def truncate(text: str, width: int, ellipsis: str = "…") -> str:
    """Cut `text` to `width` characters, marking the cut with `ellipsis`."""
    if len(text) <= width:
        return text
    return text[: max(0, width - len(ellipsis))] + ellipsis


def slugify(text: str) -> str:
    """A lower-case, dash-separated slug for file names."""
    return re.sub(r"[^a-z0-9]+", "-", normalise_payee(text).lower()).strip("-")
