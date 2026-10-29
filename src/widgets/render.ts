import { formatPrice } from "./format";
import { formatTime } from "../util/time";
import { titleCase } from "../util/text";

export interface Widget {
	id: string;
	name: string;
	priceCents: number;
	stock: number;
}

/** One line per widget: its name, price and when it was last seen. */
export function renderRow(w: Widget, seen: Date): string {
	return `${titleCase(w.name)}  ${formatPrice(w.priceCents)}  ${formatTime(seen)}`;
}

export function renderList(ws: Widget[], seen: Date): string {
	return ws.map((w) => renderRow(w, seen)).join("\n");
}
