export function money(cents: number): string {
	const sign = cents < 0 ? "-" : "";
	const abs = Math.abs(Math.round(cents));
	return `${sign}$${Math.floor(abs / 100)}.${String(abs % 100).padStart(2, "0")}`;
}

export function percent(x: number): string {
	return `${Math.round(x * 100)}%`;
}
