// Prices for the shop's checkout.

export interface Line {
	sku: string;
	unitCents: number;
	quantity: number;
}

export function lineTotal(line: Line): number {
	return line.unitCents * line.quantity;
}

export function subtotal(lines: Line[]): number {
	let sum = 0;
	for (const line of lines) {
		sum += lineTotal(line);
	}
	return sum;
}

export function formatCents(cents: number): string {
	const dollars = Math.floor(cents / 100);
	const rest = String(cents % 100).padStart(2, "0");
	return `$${dollars}.${rest}`;
}
