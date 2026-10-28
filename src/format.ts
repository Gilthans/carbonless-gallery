/** Numbers back to a comma-separated line. */
export function format(values: number[]): string {
  const parts: string[] = [];
  for (const v of values) {
    parts.push(v.toFixed(2));
  }
  return parts.join(", ");
}

export const EMPTY = format([]);
