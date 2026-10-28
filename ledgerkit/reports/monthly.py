"""Monthly spending summary, grouped by category."""

from collections import defaultdict
from dataclasses import dataclass
from decimal import Decimal
from typing import Iterable

from ledgerkit.parsers.csv_reader import Transaction


@dataclass
class MonthSummary:
    month: str
    income: Decimal
    spending: Decimal
    by_category: dict[str, Decimal]

    @property
    def net(self) -> Decimal:
        return self.income + self.spending


def summarise(
    transactions: Iterable[Transaction],
    categorise,
) -> list[MonthSummary]:
    """One summary per calendar month, oldest first."""
    months: dict[str, MonthSummary] = {}
    for tx in transactions:
        key = tx.posted.strftime("%Y-%m")
        summary = months.get(key)
        if summary is None:
            summary = MonthSummary(key, Decimal(0), Decimal(0), defaultdict(Decimal))
            months[key] = summary
        if tx.amount >= 0:
            summary.income += tx.amount
        else:
            summary.spending += tx.amount
            summary.by_category[categorise(tx)] += tx.amount
    return [months[key] for key in sorted(months)]


def render(summaries: list[MonthSummary]) -> str:
    lines = []
    for summary in summaries:
        lines.append(f"{summary.month}  in {summary.income:>10}  out {summary.spending:>10}")
        for category, amount in sorted(summary.by_category.items()):
            lines.append(f"    {category:<20} {amount:>10}")
    return "\n".join(lines)
