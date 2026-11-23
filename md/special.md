---
title: Release checklist
owner: release-team
reviewed: 2026-09-01
---

# Release checklist

<details>
<summary>Who can cut a release</summary>

Anyone on the release team, with a second person watching.

</details>

The checklist runs top to bottom. Items marked <kbd>manual</kbd> need a person at the keyboard.

<!-- TODO: move the smoke test list into its own page -->

## Load estimate

The expected peak load is

$$
L = \frac{p \cdot s}{t}
$$

where p is passengers per sailing, s sailings per hour and t the booking window in hours.

## Release flow

```mermaid
graph LR
  A[Freeze] --> B[Build]
  B --> C[Deploy]
```

## Notes

Keep this page short.
