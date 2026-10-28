"""Compares spending against a per-category monthly budget."""

from dataclasses import dataclass
from decimal import Decimal


@dataclass(frozen=True)
class BudgetLine:
    category: str
    limit: Decimal
    spent: Decimal

    @property
    def remaining(self) -> Decimal:
        return self.limit + self.spent

    @property
    def over(self) -> bool:
        return self.remaining < 0


def compare(limits: dict[str, Decimal], spent: dict[str, Decimal]) -> list[BudgetLine]:
    """One line per budgeted category, in the order the budget lists them."""
    return [
        BudgetLine(category, limit, spent.get(category, Decimal(0)))
        for category, limit in limits.items()
    ]


def format_line(line: BudgetLine) -> str:
    marker = "!!" if line.over else "  "
    return f"{marker} {line.category:<18} {line.spent:>9} of {line.limit:>9}"


def format_report(lines: list[BudgetLine]) -> str:
    header = f"   {'category':<18} {'spent':>9}    {'limit':>9}"
    body = [format_line(line) for line in lines]
    over = sum(1 for line in lines if line.over)
    footer = f"{over} categor{'y' if over == 1 else 'ies'} over budget"
    return "\n".join([header, *body, "", footer])
