export interface Client {
	health(): Promise<unknown>;
}

export function createClient(base: string): Client {
	const call = (op: string) => fetch(`${base}/${op}`).then((r) => r.json());

	return {
		health: () => call("health"),
	};
}
