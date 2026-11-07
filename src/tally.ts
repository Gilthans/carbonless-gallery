export interface Item {
	name: string;
	cents: number;
}

export function total(items: Item[]): number {
	let sum = 0;
	for (const item of items) sum += item.cents;
	return sum;
}
