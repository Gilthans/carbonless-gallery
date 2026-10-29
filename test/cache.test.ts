import { describe, expect, it, vi } from "vitest";
import { Cache } from "../src/cache";

describe("Cache", () => {
	it("returns what was set", () => {
		const c = new Cache<number>();
		c.set("a", 1);
		expect(c.get("a")).toBe(1);
	});

	it("forgets an entry after its ttl", () => {
		vi.useFakeTimers();
		const c = new Cache<number>(1000);
		c.set("a", 1);
		vi.advanceTimersByTime(1001);
		expect(c.get("a")).toBeUndefined();
		vi.useRealTimers();
	});
});
