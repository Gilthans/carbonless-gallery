import { describe, expect, it } from "vitest";
import { buildInvoice, type Order } from "./invoice.js";
import { money } from "./money.js";

const order: Order = {
	id: "ord_1001",
	customerId: "cus_42",
	lines: [
		{ sku: "MUG", description: "Mug", quantity: 2, unitPrice: money(1250, "EUR") },
		{ sku: "TEE", description: "T-shirt", quantity: 1, unitPrice: money(2400, "EUR") },
	],
};

describe("buildInvoice", () => {
	it("sums the lines and adds tax", () => {
		const invoice = buildInvoice(order, { currency: "EUR", taxRate: 0.2 });
		expect(invoice.subtotal.minor).toBe(4900);
		expect(invoice.tax.minor).toBe(980);
		expect(invoice.total.minor).toBe(5880);
	});

	it("describes each line with its quantity", () => {
		const invoice = buildInvoice(order, { currency: "EUR", taxRate: 0 });
		expect(invoice.lines.map((l) => l.description)).toEqual([
			"2 × Mug",
			"1 × T-shirt",
		]);
	});

	it("applies a discount before tax", () => {
		const invoice = buildInvoice(order, {
			currency: "EUR",
			taxRate: 0.2,
			discount: { code: "TENOFF", kind: "percent", percent: 10 },
		});
		expect(invoice.discount.minor).toBe(490);
		expect(invoice.tax.minor).toBe(882);
		expect(invoice.total.minor).toBe(5292);
	});
});
