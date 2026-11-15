export interface Item {
  cost: number;
  weight: number;
  discount?: number;
}

export function price(item: Item): number {
  const base = item.cost * 1.2;
  const tax = base * 0.17;
  if (item.discount) {
    return base + tax - item.discount;
  }
  const shipping = item.weight * 2;
  return base + tax + shipping;
}
