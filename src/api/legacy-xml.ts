import type { Widget } from "../widgets/render";

/**
 * Reads the widget XML old servers send. Only the four fields we use;
 * anything else in the document is ignored.
 */
export function parseXml(xml: string): Widget {
	const field = (name: string) => {
		const m = new RegExp(`<${name}>([^<]*)</${name}>`).exec(xml);
		if (!m) throw new Error(`widget XML without <${name}>`);
		return m[1] ?? "";
	};
	return {
		id: field("id"),
		name: field("name"),
		priceCents: Number(field("price-cents")),
		stock: Number(field("stock")),
	};
}
