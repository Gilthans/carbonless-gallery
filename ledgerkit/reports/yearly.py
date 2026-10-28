"""Fiscal-year totals."""

from datetime import date
from decimal import Decimal
from typing import Iterable

from ledgerkit.parsers.csv_reader import Transaction


def fiscal_year(posted: date, start_month: int) -> int:
    """The fiscal year a date belongs to, named by the year it starts in."""
    return posted.year if posted.month >= start_month else posted.year - 1


def totals_by_year(
    transactions: Iterable[Transaction], start_month: int
) -> dict[int, Decimal]:
    totals: dict[int, Decimal] = {}
    for tx in transactions:
        year = fiscal_year(tx.posted, start_month)
        totals[year] = totals.get(year, Decimal(0)) + tx.amount
    return totals


def best_and_worst(totals: dict[int, Decimal]) -> tuple[int, int]:
    """The fiscal years with the highest and the lowest net."""
    if not totals:
        raise ValueError("no fiscal years to compare")
    ordered = sorted(totals, key=lambda year: totals[year])
    return ordered[-1], ordered[0]


def render_years(totals: dict[int, Decimal], start_month: int) -> str:
    lines = []
    for year in sorted(totals):
        label = f"FY{year}" if start_month == 1 else f"FY{year}/{(year + 1) % 100:02d}"
        lines.append(f"{label:<10} {totals[year]:>12}")
    return "\n".join(lines)
