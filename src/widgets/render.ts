import { formatDate } from "../util/dates";
import { titleCase } from "../util/strings";

export interface Widget {
	id: string;
	name: string;
	priceCents: number;
	stock: number;
}

/** One line per widget: its name, price and when it was last seen. */
export function renderRow(w: Widget, seen: Date): string {
	return `${titleCase(w.name)}  ${formatPrice(w.priceCents)}  ${formatDate(seen)}`;
}

/** Prices are kept in cents; shown with two decimals and a currency. */
export function formatPrice(cents: number, currency = "USD"): string {
	const amount = (cents / 100).toFixed(2);
	switch (currency) {
		case "EUR":
			return `${amount} €`;
		case "GBP":
			return `£${amount}`;
		default:
			return `$${amount}`;
	}
}

export function renderList(ws: Widget[], seen: Date): string {
	return ws.map((w) => renderRow(w, seen)).join("\n");
}
