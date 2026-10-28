import { describe, expect, it } from "vitest";
import { discountAmount, parseCode } from "./discounts.js";
import { money } from "./money.js";

describe("parseCode", () => {
	it("normalises case and whitespace", () => {
		expect(parseCode("  spring24 ")).toBe("SPRING24");
	});

	it("rejects codes with punctuation", () => {
		expect(() => parseCode("SPRING-24")).toThrow(/not a valid code/);
	});
});

describe("discountAmount", () => {
	const subtotal = money(4900, "EUR");

	it("takes a percentage, rounded to the cent", () => {
		const off = discountAmount({ code: "TENOFF", kind: "percent", percent: 15 }, subtotal);
		expect(off.minor).toBe(735);
	});

	it("never takes more than the subtotal", () => {
		const off = discountAmount(
			{ code: "BIGGIFT", kind: "fixed", amount: money(10000, "EUR") },
			subtotal,
		);
		expect(off.minor).toBe(4900);
	});

	it("refuses a fixed discount in another currency", () => {
		expect(() =>
			discountAmount({ code: "USDTEN", kind: "fixed", amount: money(1000, "USD") }, subtotal),
		).toThrow(/is in USD/);
	});
});
