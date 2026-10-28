export type Health = "up" | "degraded" | "down";

export interface ServiceCheck {
	name: string;
	url: string;
	health: Health;
	latencyMs: number;
	checkedAt: Date;
}

export async function runCheck(name: string, url: string): Promise<ServiceCheck> {
	const started = performance.now();
	let health: Health = "down";
	try {
		const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
		health = response.ok ? "up" : "degraded";
	} catch {
		health = "down";
	}
	return {
		name,
		url,
		health,
		latencyMs: Math.round(performance.now() - started),
		checkedAt: new Date(),
	};
}
