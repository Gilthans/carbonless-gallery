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

const BULK_THRESHOLD = 10;
const BULK_RATE = 0.05;

export function bulkDiscount(lines: Line[]): number {
	const items = lines.reduce((n, line) => n + line.quantity, 0);
	if (items <= BULK_THRESHOLD) return 0;
	return Math.round(subtotal(lines) * BULK_RATE);
}

export function total(lines: Line[]): number {
	return subtotal(lines) - bulkDiscount(lines);
}

export function formatCents(cents: number): string {
	const dollars = Math.floor(cents / 100);
	const rest = String(cents % 100).padStart(2, "0");
	return `$${dollars}.${rest}`;
}
