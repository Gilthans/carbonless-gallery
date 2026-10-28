import type { Schedule } from "./schedule.js";

/** Formats a run time for the job list, in the server's time zone. */
export function formatRun(at: Date | null): string {
	if (at === null) return "never";
	const pad = (n: number) => String(n).padStart(2, "0");
	return `${at.getFullYear()}-${pad(at.getMonth() + 1)}-${pad(at.getDate())} ${pad(at.getHours())}:${pad(at.getMinutes())}`;
}

/** "every 5 minutes", "at 09:30 on weekdays": a short human description. */
export function describeSchedule(schedule: Schedule): string {
	const minutes = [...schedule.minutes];
	const hours = [...schedule.hours];
	if (minutes.length === 60 && hours.length === 24) return "every minute";
	if (hours.length === 24 && minutes.length > 1) {
		const step = minutes[1] - minutes[0];
		// Only a step that divides the hour repeats evenly: */7 runs at :56 then :00.
		if (60 % step === 0 && minutes.every((m, i) => m === i * step)) {
			return `every ${step} minutes`;
		}
	}
	if (minutes.length === 1 && hours.length === 1) {
		const time = `${String(hours[0]).padStart(2, "0")}:${String(minutes[0]).padStart(2, "0")}`;
		const days = [...schedule.daysOfWeek];
		const weekdays = days.length === 5 && days.every((d) => d >= 1 && d <= 5);
		return weekdays ? `at ${time} on weekdays` : `at ${time}`;
	}
	return "on a custom schedule";
}
