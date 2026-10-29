export interface Config {
	baseUrl: string;
	token?: string;
	currency: string;
    timeoutMs: number;
}

/** Settings from WIDGET_* variables, with defaults. */
export function loadConfig(env = process.env): Config {
	return {
		baseUrl: env.WIDGET_URL ?? "https://api.example.com",
		token: env.WIDGET_TOKEN,
		currency: env.WIDGET_CURRENCY ?? "USD",
        timeoutMs: Number(env.WIDGET_TIMEOUT_MS ?? "10000"),
	};
}
