export interface Discount {
  code: string;
  percent: number;
}

export function loadDiscounts(json: string): Map<string, Discount> {
  try {
    const list = JSON.parse(json) as Discount[];
    return new Map(list.map((d) => [normalizeCode(d.code), d]));
  } catch {
    return new Map();
  }
}

export function lookupDiscount(discounts: Map<string, Discount>, code: string): Discount | undefined {
  return discounts.get(normalizeCode(code));
}

function normalizeCode(code: string): string {
  return code.trim().toUpperCase();
}
