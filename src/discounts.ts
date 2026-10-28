import { type Money, money } from "./money.js";

/** A code the customer types at checkout. */
export type DiscountCode =
	| { code: string; kind: "percent"; percent: number }
	| { code: string; kind: "fixed"; amount: Money };

const CODE = /^[A-Z0-9]{4,16}$/;

export function parseCode(raw: string): string {
	const code = raw.trim().toUpperCase();
	if (!CODE.test(code)) {
		throw new Error(`discount: "${raw}" is not a valid code`);
	}
	return code;
}

/**
 * The amount a discount takes off `subtotal`: never more than the subtotal
 * itself, so a total can't go negative.
 */
export function discountAmount(discount: DiscountCode, subtotal: Money): Money {
	if (discount.kind === "percent") {
		if (discount.percent <= 0 || discount.percent > 100) {
			throw new Error(`discount: ${discount.percent}% is out of range`);
		}
		return money(Math.round((subtotal.minor * discount.percent) / 100), subtotal.currency);
	}
	if (discount.amount.currency !== subtotal.currency) {
		throw new Error(
			`discount: ${discount.code} is in ${discount.amount.currency}, the invoice in ${subtotal.currency}`,
		);
	}
	return money(Math.min(discount.amount.minor, subtotal.minor), subtotal.currency);
}
