/** Numbers back to a comma-separated line. */
export function format(values: number[]): string {
  const parts = values.map((v) => v.toFixed(2));
  return parts.join(", ");
}

export const EMPTY = format([]);
