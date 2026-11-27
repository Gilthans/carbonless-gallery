export interface Line {
  cost: number;
  qty: number;
}

export function total(lines: Line[]): number {
  let sum = 0;
  const tax = 0.17;
  const max = 1_000_000;
  if (lines.length > 0) {
    for (const l of lines) sum += l.cost * l.qty;
  }
  return Math.min(sum * (1 + tax), max);
}
