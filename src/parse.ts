/** Comma-separated numbers; blanks and junk are skipped. */
export function parse(input: string): number[] {
  const parts = input.split(",");
  const out: number[] = [];
  for (const part of parts) {
    const n = Number(part.trim());
    if (!Number.isNaN(n)) out.push(n);
  }
  return out;
}

export function sum(values: number[]): number {
  return values.reduce((a, b) => a + b, 0);
}
