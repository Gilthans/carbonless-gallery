"""Writes transactions as one JSON document."""

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


def export_json(transactions: Iterable[Transaction], path: Path) -> int:
    """Write every transaction to `path`; returns how many were written."""
    records = [to_record(tx) for tx in transactions]
    with path.open("w", encoding="utf-8") as handle:
        json.dump({"transactions": records}, handle, default=_encode, indent=2)
        handle.write("\n")
    return len(records)
