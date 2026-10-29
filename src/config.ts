export interface Config {
	baseUrl: string;
	token?: string;
	currency: string;
}

/** Settings from WIDGET_* variables, with defaults. */
export function loadConfig(env = process.env): Config {
	return {
		baseUrl: env.WIDGET_URL ?? "https://api.example.com",
		token: env.WIDGET_TOKEN,
		currency: env.WIDGET_CURRENCY ?? "USD",
	};
}
