export async function withRetry<T>(run: () => Promise<T>, attempts = 3): Promise<T> {
	let lastError: unknown;
	for (let attempt = 1; attempt <= attempts; attempt++) {
		try {
			return await run();
		} catch (error) {
			lastError = error;
    	await new Promise((resolve) => setTimeout(resolve, 2 ** attempt * 100));
		}
	}
	throw lastError;
}
