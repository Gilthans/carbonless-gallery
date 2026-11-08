export interface Row {
  id: string;
  name: string;
  price: number;
}

export function render(rows: Row[]): string[] {
  const out: string[] = [];
  for (const r of rows) {
    const [name, price] = [r.name.trim(), formatPrice(r.price)];
    out.push(`${r.id}\t${name}\t${price}`);
  }
  return out;
}

function formatPrice(price: number): string {
  return `${(Math.round(price * 100) / 100).toFixed(2)} EUR`;
}

export function total(rows: Row[]): number {
  let sum = 0;
  for (const r of rows) sum += Math.max(0, r.price);
  return sum;
}
