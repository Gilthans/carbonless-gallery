"""Monthly spending summary, grouped by category."""

from collections import defaultdict
from dataclasses import dataclass, field
from decimal import Decimal
from typing import Callable, Iterable

from ledgerkit.io.readers.csv_reader import Transaction

Categoriser = Callable[[Transaction], str]


@dataclass
class MonthSummary:
    month: str
    income: Decimal = Decimal(0)
    spending: Decimal = Decimal(0)
    by_category: dict[str, Decimal] = field(default_factory=lambda: defaultdict(Decimal))

    @property
    def net(self) -> Decimal:
        return self.income + self.spending

    def add(self, tx: Transaction, categorise: Categoriser) -> None:
        if tx.amount >= 0:
            self.income += tx.amount
        else:
            self.spending += tx.amount
            self.by_category[categorise(tx)] += tx.amount


def summarise(
    transactions: Iterable[Transaction],
    categorise: Categoriser,
) -> list[MonthSummary]:
    """One summary per calendar month, oldest first."""
    months: dict[str, MonthSummary] = {}
    for tx in transactions:
        key = tx.posted.strftime("%Y-%m")
        months.setdefault(key, MonthSummary(key)).add(tx, categorise)
    return [months[key] for key in sorted(months)]


def render(summaries: list[MonthSummary]) -> str:
    lines = []
    for summary in summaries:
        lines.append(f"{summary.month}  in {summary.income:>10}  out {summary.spending:>10}")
        for name, amount in sorted(summary.by_category.items(), key=lambda item: item[1]):
            lines.append(f"    {name:<20} {amount:>10}")
    return "\n".join(lines)
