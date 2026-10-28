import { randomUUID } from "node:crypto";
import { retry } from "./retry.js";
import { verifySignature } from "./verify.js";

export interface Target {
	url: string;
	/** Extra headers for this target, e.g. its own auth token. */
	headers?: Record<string, string>;
}

export interface RelayConfig {
	secret: string;
	targets: Target[];
	/** Tries per target, the first one included. */
	attempts?: number;
}

export interface Delivery {
	target: string;
	status: number;
}

/**
 * Forwards a verified webhook to every target, one after another. Every try
 * of one delivery carries the same Idempotency-Key, so a target can drop a
 * retry of something it already processed.
 */
export async function relay(
	config: RelayConfig,
	body: string,
	signature: string | undefined,
): Promise<Delivery[]> {
	if (!verifySignature(config.secret, body, signature)) {
		throw new Error("relay: bad signature");
	}
	const deliveries: Delivery[] = [];
	for (const target of config.targets) {
		const key = randomUUID();
		const response = await retry(async () => {
			const r = await fetch(target.url, {
				method: "POST",
				headers: { ...target.headers, "content-type": "application/json", "idempotency-key": key },
				body,
			});
			if (r.status >= 500) throw new Error(`relay: ${target.url} answered ${r.status}`);
			return r;
		}, config.attempts ?? 3);
		deliveries.push({ target: target.url, status: response.status });
	}
	return deliveries;
}
