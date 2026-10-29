import { Cache } from "../cache";
import { RetryableError, retry } from "../util/retry";
import type { Widget } from "../widgets/render";

export interface ClientOptions {
	baseUrl: string;
	token?: string;
	signal?: AbortSignal;
}

export class HttpError extends Error {
	constructor(readonly status: number) {
		super(`HTTP ${status}`);
	}
}

export class WidgetClient {
	private cache = new Cache<Widget>();

	constructor(private opts: ClientOptions) {}

	/** One widget, from the cache when it's there. */
	async widget(id: string): Promise<Widget> {
		const hit = this.cache.get(id);
		if (hit) return hit;
		const w = await retry(() => this.fetchWidget(id));
		this.cache.set(id, w);
		return w;
	}

	private async fetchWidget(id: string): Promise<Widget> {
		const url = `${this.opts.baseUrl}/widgets/${encodeURIComponent(id)}`;
		const res = await fetch(url, {
			headers: this.headers(),
			signal: this.opts.signal,
		});
		if (res.status >= 500) throw new RetryableError(res.status);
		if (!res.ok) throw new HttpError(res.status);
		return (await res.json()) as Widget;
	}

	private headers(): Record<string, string> {
		const h: Record<string, string> = { accept: "application/json" };
		if (this.opts.token) h.authorization = `Bearer ${this.opts.token}`;
		return h;
	}
}
