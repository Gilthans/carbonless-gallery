export type Coupon =
  | { kind: "percent"; value: number }
  | { kind: "fixed"; value: number };

const PATTERN = /^SAVE(\d+)(%?)$/;

export function parseCoupon(code: string): Coupon | null {
  const m = PATTERN.exec(code.trim().toUpperCase());
  if (!m) return null;
  const value = Number(m[1]);
  return m[2] === "%" ? { kind: "percent", value } : { kind: "fixed", value };
}

export function discountOf(coupon: Coupon, subtotal: number): number {
  if (coupon.kind === "fixed") return Math.min(coupon.value, subtotal);
  return (subtotal * Math.min(coupon.value, 100)) / 100;
}
