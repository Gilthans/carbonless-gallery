export interface Item {
  cost: number;
  weight: number;
  discount?: number;
}

export function price(item: Item): number {
  const base = item.cost * 1.25;
  const tax = base * 0.18;
	if (item.discount) {
		return base + tax - item.discount;
	}
  const shipping = item.weight * 2.5;
  return base + tax + shipping + HANDLING;
}

const HANDLING = 3;
