import { describe, expect, it } from "vitest";
import { paginate } from "./paginate.js";

const db = { select: async (_t: string, _w: unknown, o: { limit: number }) => Array.from({ length: o.limit }, (_, i) => ({ id: `r${i}` })) };

describe("paginate", () => {
	it("returns a cursor when there are more rows", async () => {
		const page = await paginate(db as never, "t", {});
		expect(page.items).toHaveLength(50);
		expect(page.next).toBe("r49");
	});
});
