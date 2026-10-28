import { verifySignature } from "./verify.js";

export interface RelayConfig {
	secret: string;
	targets: string[];
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
		const response = await fetch(target, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body,
		});
		deliveries.push({ target, status: response.status });
	}
	return deliveries;
}
