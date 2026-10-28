"""Runtime configuration, read once from the environment."""

import os
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Config:
    data_dir: Path
    default_currency: str
    fiscal_year_start_month: int
    categories_file: Path


def load_config() -> Config:
    data_dir = Path(os.environ.get("LEDGERKIT_DATA", "~/.ledgerkit")).expanduser()
    month = int(os.environ.get("LEDGERKIT_FY_START", "1"))
    if not 1 <= month <= 12:
        raise ValueError(f"LEDGERKIT_FY_START must be 1-12, got {month}")
    return Config(
        data_dir=data_dir,
        default_currency=os.environ.get("LEDGERKIT_CURRENCY", "GBP"),
        fiscal_year_start_month=month,
        categories_file=data_dir / "categories.toml",
    )
