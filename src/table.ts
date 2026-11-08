export interface Row {
  id: string;
  name: string;
  price: number;
}

export function render(rows: Row[]): string[] {
  const out: string[] = [];
  for (const r of rows) {
    const name = r.name;
    const cents = Math.round(r.price * 100 + Number.EPSILON);
    const price = (cents / 100).toFixed(2) + " EUR";
    out.push(`${r.id}\t${name}\t${price}`);
  }
  return out;
}

export function total(rows: Row[]): number {
  let sum = 0;
  for (const r of rows) sum += Math.max(0, r.price);
  return sum;
}

export function formatPrice(price: number): string {
  return `${price.toFixed(2)} EUR`;
}
