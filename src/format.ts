/** Formats a run time for the job list, in the server's time zone. */
export function formatRun(at: Date | null): string {
	if (at === null) return "never";
	const pad = (n: number) => String(n).padStart(2, "0");
	return `${at.getFullYear()}-${pad(at.getMonth() + 1)}-${pad(at.getDate())} ${pad(at.getHours())}:${pad(at.getMinutes())}`;
}
