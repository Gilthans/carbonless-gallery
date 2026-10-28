/** A parsed cron expression: the allowed values of each field. */
export interface Schedule {
	minutes: Set<number>;
	hours: Set<number>;
	daysOfMonth: Set<number>;
	months: Set<number>;
	daysOfWeek: Set<number>;
}

const FIELDS = [
	{ name: "minute", min: 0, max: 59 },
	{ name: "hour", min: 0, max: 23 },
	{ name: "day of month", min: 1, max: 31 },
	{ name: "month", min: 1, max: 12 },
	{ name: "day of week", min: 0, max: 6 },
] as const;

function matches(schedule: Schedule, at: Date): boolean {
	return (
		schedule.minutes.has(at.getMinutes()) &&
		schedule.hours.has(at.getHours()) &&
		schedule.daysOfMonth.has(at.getDate()) &&
		schedule.months.has(at.getMonth() + 1) &&
		schedule.daysOfWeek.has(at.getDay())
	);
}

/**
 * The next minute at or after `from` that the schedule allows, or null if
 * none comes within `limitDays`.
 */
export function nextRun(schedule: Schedule, from: Date, limitDays = 366): Date | null {
	const candidate = new Date(from);
	candidate.setSeconds(0, 0);
	const end = from.getTime() + limitDays * 24 * 60 * 60 * 1000;
	while (candidate.getTime() <= end) {
		if (matches(schedule, candidate)) return candidate;
		candidate.setMinutes(candidate.getMinutes() + 1);
	}
	return null;
}

export function parseSchedule(expression: string): Schedule {
	const parts = expression.trim().split(/\s+/);
	if (parts.length !== 5) {
		throw new Error(`cron: expected 5 fields, got ${parts.length} in "${expression}"`);
	}
	const [minutes, hours, daysOfMonth, months, daysOfWeek] = parts.map((part, i) =>
		parseField(part, FIELDS[i]),
	);
	return { minutes, hours, daysOfMonth, months, daysOfWeek };
}

function parseField(
	text: string,
	field: { name: string; min: number; max: number },
): Set<number> {
	const values = new Set<number>();
	for (const item of text.split(",")) {
		const [range, stepText] = item.split("/");
		const step = stepText === undefined ? 1 : Number(stepText);
		if (!Number.isInteger(step) || step < 1) {
			throw new Error(`cron: bad step "${stepText}" in ${field.name}`);
		}
		let [low, high] = [field.min, field.max];
		if (range !== "*") {
			const [a, b] = range.split("-").map(Number);
			low = a;
			high = b ?? a;
		}
		if (low < field.min || high > field.max || low > high) {
			throw new Error(`cron: ${field.name} "${item}" is out of range`);
		}
		for (let v = low; v <= high; v += step) values.add(v);
	}
	return values;
}

/** "every 5 minutes", "at 09:30 on weekdays": a short human description. */
export function describe(schedule: Schedule): string {
	const minutes = [...schedule.minutes];
	const hours = [...schedule.hours];
	if (minutes.length === 60 && hours.length === 24) return "every minute";
	if (hours.length === 24 && minutes.length > 1) {
		const step = minutes[1] - minutes[0];
		if (minutes.every((m, i) => m === i * step)) return `every ${step} minutes`;
	}
	if (minutes.length === 1 && hours.length === 1) {
		const time = `${String(hours[0]).padStart(2, "0")}:${String(minutes[0]).padStart(2, "0")}`;
		const days = [...schedule.daysOfWeek];
		const weekdays = days.length === 5 && days.every((d) => d >= 1 && d <= 5);
		return weekdays ? `at ${time} on weekdays` : `at ${time}`;
	}
	return "on a custom schedule";
}

/** Formats a run time for the job list, in the server's time zone. */
export function formatRun(at: Date | null): string {
	if (at === null) return "never";
	const pad = (n: number) => String(n).padStart(2, "0");
	return `${at.getFullYear()}-${pad(at.getMonth() + 1)}-${pad(at.getDate())} ${pad(at.getHours())}:${pad(at.getMinutes())}`;
}
