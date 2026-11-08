export interface Item {
  sku: string;
  price: number;
  qty: number;
}

export function subtotal(items: Item[]): number {
  return items.reduce((sum, i) => sum + i.price * i.qty, 0);
}

export function total(items: Item[], discount = 0): number {
  const raw = subtotal(items) - discount;
  return Math.round(raw * 100) / 100;
}
