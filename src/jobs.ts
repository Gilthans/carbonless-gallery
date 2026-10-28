import { formatRun, nextRun, parseSchedule, type Schedule } from "./schedule.js";

export interface Job {
	name: string;
	schedule: Schedule;
	command: string[];
	lastRun: Date | null;
}

export function defineJob(name: string, expression: string, command: string[]): Job {
	return { name, schedule: parseSchedule(expression), command, lastRun: null };
}

export function dueJobs(jobs: Job[], now: Date): Job[] {
	return jobs.filter((job) => {
		const next = nextRun(job.schedule, job.lastRun ?? new Date(now.getTime() - 60_000));
		return next !== null && next.getTime() <= now.getTime();
	});
}

export function listJobs(jobs: Job[], now: Date): string {
	return jobs
		.map((job) => `${job.name.padEnd(24)} next ${formatRun(nextRun(job.schedule, now))}`)
		.join("\n");
}
