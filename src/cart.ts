export interface Line {
  cost: number;
  qty: number;
}

export function total(lines: Line[]): number {
  let sum = 0;
  if (lines.length > 0) {
    for (const l of lines) sum += l.cost * l.qty;
  }
  return sum;
}
