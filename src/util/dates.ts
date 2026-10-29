/** Dates in widget rows: ISO day, UTC. */
export function formatDate(d: Date): string {
	return d.toISOString().slice(0, 10);
}

/** Days between two dates, rounded down. */
export function daysBetween(a: Date, b: Date): number {
	const ms = Math.abs(b.getTime() - a.getTime());
	return Math.floor(ms / 86_400_000);
}

/** Whether `d` is today, in UTC. */
export function isToday(d: Date, now = new Date()): boolean {
	return formatDate(d) === formatDate(now);
}
