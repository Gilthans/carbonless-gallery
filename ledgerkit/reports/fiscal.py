"""Fiscal-year totals."""

from dataclasses import dataclass
from datetime import date
from decimal import Decimal
from typing import Iterable

from ledgerkit.io.readers.csv_reader import Transaction


@dataclass(frozen=True)
class FiscalCalendar:
    start_month: int

    def year_of(self, posted: date) -> int:
        """The fiscal year a date belongs to, named by the year it starts in."""
        return posted.year if posted.month >= self.start_month else posted.year - 1

    def label(self, year: int) -> str:
        if self.start_month == 1:
            return f"FY{year}"
        return f"FY{year}/{(year + 1) % 100:02d}"


def totals_by_year(
    transactions: Iterable[Transaction], calendar: FiscalCalendar
) -> dict[int, Decimal]:
    totals: dict[int, Decimal] = {}
    for tx in transactions:
        year = calendar.year_of(tx.posted)
        totals[year] = totals.get(year, Decimal(0)) + tx.amount
    return totals


def best_and_worst(totals: dict[int, Decimal]) -> tuple[int, int]:
    """The fiscal years with the highest and the lowest net."""
    if not totals:
        raise ValueError("no fiscal years to compare")
    ordered = sorted(totals, key=lambda year: totals[year])
    return ordered[-1], ordered[0]


def render_years(totals: dict[int, Decimal], calendar: FiscalCalendar) -> str:
    return "\n".join(f"{calendar.label(year):<10} {totals[year]:>12}" for year in sorted(totals))
