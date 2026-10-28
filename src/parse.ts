/** Comma-separated numbers; blanks and junk are skipped. */
export function parse(input: string): number[] {
  const parts = input.split(",");
  const numbers = parts.map((p) => Number(p.trim()));
  return numbers;
}

export function sum(values: number[]): number {
  return values.reduce((a, b) => a + b, 0);
}
