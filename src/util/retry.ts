/** Thrown for answers worth asking again (5xx). */
export class RetryableError extends Error {
	constructor(readonly status: number) {
		super(`retryable HTTP ${status}`);
	}
}

export const MAX_ATTEMPTS = 5;

/** Calls `f` until it succeeds, waiting longer each time it throws RetryableError. */
export async function retry<T>(f: () => Promise<T>): Promise<T> {
	for (let attempt = 1; ; attempt++) {
		try {
			return await f();
		} catch (e) {
			if (!(e instanceof RetryableError) || attempt >= MAX_ATTEMPTS) throw e;
			const delay = 2 ** attempt * 100;
			await new Promise((r) => setTimeout(r, delay));
		}
	}
}
