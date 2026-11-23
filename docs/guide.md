# Ledgerkit guide

Ledgerkit reads bank exports and turns them into a clean ledger. This guide
walks through installing it, importing a first file and checking the result.

## Overview

Ledgerkit has three parts: a parser for each bank format, a matcher that pairs
transfers between your own accounts, and a report writer. Each part can be used
on its own or through the `ledger` command.

## Installing

Install the package with your usual tool. Ledgerkit needs Python 3.10 or newer
and has no other runtime dependencies.

```sh
pip install --upgrade ledgerkit
ledger --version
```

If the second command prints a version, the install worked.

![diagram](img/diagram.png)

![logo](img/logo.png)

![badge](https://img.shields.io/badge/demo-ok-green)

## Importing a file

Point `ledger import` at an export. The format is detected from the file, so
you rarely need to name it.

- Use `--account` to set the account the file belongs to, so transfers can be
  matched later.

  Accounts are created on first use. Renaming one later keeps its history,
  and merging two accounts keeps both.
- Use `--since` to skip rows older than a date, which helps with overlapping
    exports.
- Use `--dry-run` to preview exactly what would be imported without writing anything.

The importer is careful with duplicates. Rows that match an earlier import on
date, amount and description are skipped, and the count is printed at the end.

## Supported formats

| Format | Extension | Notes |
|---|---|---|
| OFX | .ofx | Full support, including balances |
| CSV | .csv | Column names are detected, case ignored |
| QIF | .qif | Dates are read as day first | Legacy |
| MT940 | .sta | Statement lines only |

Formats are tried in the order listed, and the first parser that accepts the
file wins.

## Matching transfers

A transfer shows up twice, once in each account.

The matcher pairs rows with opposite amounts that are at most three days apart.

1. Rows are grouped by amount.
2. Within a group, the closest dates are paired first.
3. Pairs that remain ambiguous are left alone and listed for you to decide.

Matching never changes the imported rows. It only adds a link between the two.

## Reports

Reports are written as plain text or as HTML. Choose with `--format`, and use
`--out` to write to a file instead of the terminal.

The monthly report groups rows by category and shows the total of each. The
yearly report adds a comparison with the previous year, so a missing month is
easy to spot. Both reports sort categories by size, biggest first.

### Categories

Categories come from rules in your configuration file. A rule names a pattern
and a category, and the first rule that matches a row decides its category.

Keep the specific rules above the general ones, because order is the only
tie-break there is. Rules are checked top to bottom.

## Plugins

Ledgerkit can load plugins that add formats or categories. A plugin is a small
module with a `register` function, installed next to the package.

For now plugins are marked experimental. Their interface may change between
minor versions, so pin the version you tested with.

## Configuration

The configuration file is TOML and lives in your home directory. Every key has
a default, so an empty file is valid.

> Configuration is read once at startup. Restart long running processes after
> you change it.

Keys are grouped in tables named after the part they affect, such as `parser`,
`matcher` and `report`.

## Troubleshooting

If an import finds no rows, check the file's encoding first. Ledgerkit expects
UTF-8 and prints a hint when it sees something else.

If amounts look wrong by a factor of a hundred, the export probably uses a
comma for decimals. Set `parser.decimal = ","` in the configuration file.

## Getting help

Check the troubleshooting section first; most reports are answered there.

Open an issue (see the [guide](https://example.com/b)) with the command you ran and
the first lines of the file, with account numbers removed. Please never attach a full statement.

Thanks for using Ledgerkit.
