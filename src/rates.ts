/** Per-client request limits for the relay. */
export interface Limit {
	perMinute: number;
	burst: number;
}

const DEFAULT: Limit = { perMinute: 60, burst: 10 };

export function limitFor(client: string, overrides: Map<string, Limit>): Limit {
	return overrides.get(client) ?? DEFAULT;
}

export function allowed(used: number, limit: Limit): boolean {
	return used < limit.perMinute;
}
