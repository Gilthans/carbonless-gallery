"""Reads the CSV exports most UK banks offer."""

import csv
from dataclasses import dataclass
from datetime import date, datetime
from decimal import Decimal
from pathlib import Path
from typing import Iterator

from ledgerkit.utils.text import normalise_payee

DATE_FORMATS = ("%d/%m/%Y", "%Y-%m-%d", "%d %b %Y")


@dataclass(frozen=True)
class Transaction:
    posted: date
    payee: str
    amount: Decimal
    reference: str


def _parse_date(text: str) -> date:
    for fmt in DATE_FORMATS:
        try:
            return datetime.strptime(text.strip(), fmt).date()
        except ValueError:
            continue
    raise ValueError(f"unrecognised date: {text!r}")


def read_transactions(path: Path) -> Iterator[Transaction]:
    """Yield one Transaction per data row; header names are case-insensitive."""
    with path.open(newline="", encoding="utf-8-sig") as handle:
        reader = csv.DictReader(handle)
        for row in reader:
            fields = {key.strip().lower(): value for key, value in row.items()}
            yield Transaction(
                posted=_parse_date(fields["date"]),
                payee=normalise_payee(fields["description"]),
                amount=Decimal(fields["amount"].replace(",", "")),
                reference=fields.get("reference", "").strip(),
            )
