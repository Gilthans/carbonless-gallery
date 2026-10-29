/** Stock as people read it. */
export function formatStock(n: number): string {
	if (n === 0) return "sold out";
	if (n < 5) return "only a few left";
	return "in stock";
}
