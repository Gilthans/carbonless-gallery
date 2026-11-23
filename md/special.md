---
title: Release checklist
owner: platform-team
reviewed: 2026-11-20
---

# Release checklist

<details>
<summary>Who may cut a release</summary>

Anyone on the platform team, with a second person watching.

</details>

The checklist runs top to bottom. Items marked <kbd>by hand</kbd> need a person at the keyboard.

<!-- TODO: link the smoke test page once it exists -->

## Load estimate

The expected peak load is

$$
L = \frac{p \cdot s}{t \cdot r}
$$

where p is passengers per sailing, s sailings per hour and t the booking window in hours and r the share booked online.

## Release flow

```mermaid
graph LR
  A[Freeze] --> B[Build]
  B --> C[Deploy]
  C --> D[Announce]
```

## Notes

Keep this page short.
