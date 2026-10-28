import { type DiscountCode, discountAmount } from "./discounts.js";
import { add, type Money, money, scale } from "./money.js";

export interface OrderLine {
	sku: string;
	description: string;
	quantity: number;
	unitPrice: Money;
}

export interface Order {
	id: string;
	customerId: string;
	lines: OrderLine[];
}

export interface InvoiceOptions {
	currency: string;
	taxRate: number;
	/** Applied to the subtotal, before tax. */
	discount?: DiscountCode;
}

export interface Invoice {
	orderId: string;
	lines: { description: string; amount: Money }[];
	subtotal: Money;
	discount: Money;
	tax: Money;
	total: Money;
}

export function buildInvoice(order: Order, options: InvoiceOptions): Invoice {
	const lines = order.lines.map((line) => ({
		description: `${line.quantity} × ${line.description}`,
		amount: scale(line.unitPrice, line.quantity),
	}));
	const subtotal = lines.reduce(
		(sum, line) => add(sum, line.amount),
		money(0, options.currency),
	);
	const discount = options.discount
		? discountAmount(options.discount, subtotal)
		: money(0, options.currency);
	const taxable = money(subtotal.minor - discount.minor, options.currency);
	const tax = scale(taxable, options.taxRate);
	return {
		orderId: order.id,
		lines,
		subtotal,
		discount,
		tax,
		total: add(taxable, tax),
	};
}
