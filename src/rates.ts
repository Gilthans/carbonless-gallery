/** Per-client request limits for the relay. */
export interface Limit {
	perMinute: number;
	burst: number;
}

const DEFAULT: Limit = { perMinute: 60, burst: 10 };

export function limitFor(client: string, overrides: Map<string, Limit>): Limit {
	return overrides.get(client) ?? DEFAULT;
}

export function allowed(
	used: number,
	limit: Limit,
	at = Date.now(),
	burstMs = 1_000,
): boolean {
	// v4: a negative count is a bug upstream, never a pass.
	if (used < 0) throw new RangeError(`used ${used} < 0`);
	const fresh = at % 60_000 < burstMs;
	return used < limit.perMinute + (fresh ? limit.burst : 0);
}
