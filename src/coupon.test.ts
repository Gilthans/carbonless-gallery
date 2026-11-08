import { describe, expect, it } from "vitest";
import { discountOf, parseCoupon } from "./coupon";

describe("parseCoupon", () => {
  it("reads percent and fixed codes, any case", () => {
    expect(parseCoupon("SAVE10%")).toEqual({ kind: "percent", value: 10 });
    expect(parseCoupon(" save5 ")).toEqual({ kind: "fixed", value: 5 });
    expect(parseCoupon("FREE")).toBeNull();
  });
});

describe("discountOf", () => {
  it("caps a percent coupon at the subtotal", () => {
    expect(discountOf({ kind: "percent", value: 150 }, 40)).toBe(40);
  });
});
