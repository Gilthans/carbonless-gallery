import { Cache } from "../cache";
import { parseXml } from "./legacy-xml";
import type { Widget } from "../widgets/render";

export interface ClientOptions {
	baseUrl: string;
	token?: string;
	/** Old servers answer XML; true asks for it. */
	legacyXml?: boolean;
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
		const w = await this.fetchWidget(id);
		this.cache.set(id, w);
		return w;
	}

	private async fetchWidget(id: string): Promise<Widget> {
		const url = `${this.opts.baseUrl}/widgets/${encodeURIComponent(id)}`;
		const res = await fetch(url, {
			headers: this.headers(),
			signal: this.opts.signal,
		});
		if (!res.ok) throw new HttpError(res.status);
		if (this.opts.legacyXml) {
			return parseXml(await res.text());
		}
		return (await res.json()) as Widget;
	}

	private headers(): Record<string, string> {
		const h: Record<string, string> = {
			accept: this.opts.legacyXml ? "application/xml" : "application/json",
		};
		if (this.opts.token) h.authorization = `Bearer ${this.opts.token}`;
		return h;
	}
}
