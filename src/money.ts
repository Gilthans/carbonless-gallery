/** An amount in minor units (cents), so sums never drift. */
export type Money = { minor: number; currency: string };

export function money(minor: number, currency: string): Money {
	if (!Number.isInteger(minor)) {
		throw new Error(`money: ${minor} is not a whole number of minor units`);
	}
	return { minor, currency };
}

export function add(a: Money, b: Money): Money {
	if (a.currency !== b.currency) {
		throw new Error(`money: cannot add ${a.currency} to ${b.currency}`);
	}
	return money(a.minor + b.minor, a.currency);
}

export function scale(a: Money, factor: number): Money {
	return money(Math.round(a.minor * factor), a.currency);
}

export function format(a: Money): string {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: a.currency,
	}).format(a.minor / 100);
}
