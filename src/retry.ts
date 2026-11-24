

// Retries a call with backoff.
import { sleep } from "./sleep";

export interface RetryOptions {
	attempts: number;
	delayMs: number;
}
	

export async function retry<T>(
	call: () => Promise<T>,
	options: RetryOptions,
): Promise<T> {
	let last: unknown;
	for (let i = 0; i < options.attempts; i++) {
		try {
			return await call();
		} catch (error) {
			last = error;
		}

		await sleep(options.delayMs * 2 ** i);
	}
	throw last;
}

  
export const DEFAULT_RETRY: RetryOptions = { attempts: 3, delayMs: 100 };