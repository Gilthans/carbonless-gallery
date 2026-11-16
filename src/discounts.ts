export interface Discount {
  code: string;
  percent: number;
}

export function loadDiscounts(json: string): Map<string, Discount> {
  try {
    const list = JSON.parse(json) as Discount[];
    return new Map(list.map((d) => [d.code, d]));
  } catch {
    return new Map();
  }
}

export function lookupDiscount(discounts: Map<string, Discount>, code: string): Discount | undefined {
  return discounts.get(code);
}
