import { type Coupon, discountOf } from "./coupon";

export interface Item {
  sku: string;
  price: number;
  qty: number;
}

export function subtotal(items: Item[]): number {
  return items.reduce((sum, i) => sum + i.price * i.qty, 0);
}

export function total(items: Item[], coupon?: Coupon): number {
  const sub = subtotal(items);
  const raw = sub - (coupon ? discountOf(coupon, sub) : 0);
  return Math.round(Math.max(raw, 0) * 100) / 100;
}
