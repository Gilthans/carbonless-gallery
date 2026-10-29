/** Stock as people read it. */
export function formatStock(n: number): string {
	if (n === 0) return "sold out";
	if (n < 5) return "only a few left";
	return "in stock";
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
