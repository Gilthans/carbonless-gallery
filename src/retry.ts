/** Retries `run` on failure, waiting 200 ms, 400 ms, 800 ms… (capped at 5 s) between tries. */
export async function retry<T>(run: () => Promise<T>, attempts: number): Promise<T> {
	for (let attempt = 1; ; attempt++) {
		try {
			return await run();
		} catch (error) {
			if (attempt >= attempts) throw error;
			await new Promise((resolve) => setTimeout(resolve, Math.min(5000, 100 * 2 ** attempt)));
		}
	}
}
