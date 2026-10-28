"""Writes transactions as newline-delimited JSON, one object per line."""

import json
from decimal import Decimal
from pathlib import Path
from typing import Iterable

from ledgerkit.io.readers.csv_reader import Transaction


def _encode(value: object) -> object:
    if isinstance(value, Decimal):
        return str(value)
    raise TypeError(f"cannot encode {type(value).__name__}")


def to_record(tx: Transaction) -> dict[str, object]:
    return {
        "posted": tx.posted.isoformat(),
        "payee": tx.payee,
        "amount": tx.amount,
        "reference": tx.reference,
    }


def export_ndjson(transactions: Iterable[Transaction], path: Path) -> int:
    """Write every transaction to `path`; returns how many were written."""
    count = 0
    with path.open("w", encoding="utf-8") as handle:
        for tx in transactions:
            handle.write(json.dumps(to_record(tx), default=_encode))
            handle.write("\n")
            count += 1
    return count
