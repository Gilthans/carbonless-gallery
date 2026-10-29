import { expect, it, vi } from "vitest";
import { RetryableError, retry } from "../src/util/retry";

it("retries a RetryableError, then gives up", async () => {
	vi.useFakeTimers();
	const f = vi.fn(async () => {
		throw new RetryableError(503);
	});
	const done = retry(f).catch((e) => e);
	await vi.runAllTimersAsync();
	expect(await done).toBeInstanceOf(RetryableError);
	expect(f).toHaveBeenCalledTimes(5);
	vi.useRealTimers();
});

it("doesn't retry other errors", async () => {
	const f = vi.fn(async () => {
		throw new Error("no");
	});
	await expect(retry(f)).rejects.toThrow("no");
	expect(f).toHaveBeenCalledTimes(1);
});
