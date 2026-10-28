/** Formats whole euros the French way: "1 234 €". */
export function formatEuros(amount: number): string {
	const digits = String(Math.trunc(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	return `${digits} €`;
}
