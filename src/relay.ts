import { verifySignature } from "./verify.js";

export interface Target {
	url: string;
	/** Extra headers for this target, e.g. its own auth token. */
	headers?: Record<string, string>;
}

export interface RelayConfig {
	secret: string;
	targets: Target[];
}

export interface Delivery {
	target: string;
	status: number;
}

/** Forwards a verified webhook to every target, one after another. */
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
		const response = await fetch(target.url, {
			method: "POST",
			headers: { ...target.headers, "content-type": "application/json" },
			body,
		});
		deliveries.push({ target: target.url, status: response.status });
	}
	return deliveries;
}
