/** Times in widget rows: ISO day and minute, UTC. */
export function formatTime(d: Date): string {
	return d.toISOString().slice(0, 16).replace("T", " ");
}

/** Days between two dates, rounded down. */
export function daysBetween(a: Date, b: Date): number {
	const ms = Math.abs(b.getTime() - a.getTime());
	return Math.floor(ms / 86_400_000);
}

/** Whether `d` is today, in UTC. */
export function isToday(d: Date, now = new Date()): boolean {
	return formatTime(d).slice(0, 10) === formatTime(now).slice(0, 10);
}
