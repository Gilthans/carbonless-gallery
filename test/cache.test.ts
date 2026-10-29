import { describe, expect, it, vi } from "vitest";
import { Cache } from "../src/cache";

describe("Cache", () => {
	it("returns what was set", () => {
		const c = new Cache<number>();
		c.set("a", 1);
		expect(c.get("a")).toBe(1);
	});

	it("forgets an entry at its ttl", () => {
		vi.useFakeTimers();
		const c = new Cache<number>(1000);
		c.set("a", 1);
		vi.advanceTimersByTime(1000);
		expect(c.get("a")).toBeUndefined();
		vi.useRealTimers();
	});

	it("prunes expired entries", () => {
		vi.useFakeTimers();
		const c = new Cache<number>(1000);
		c.set("a", 1);
		vi.advanceTimersByTime(500);
		c.set("b", 2);
		vi.advanceTimersByTime(600);
		expect(c.prune()).toBe(1);
		expect(c.size).toBe(1);
		vi.useRealTimers();
	});
});
