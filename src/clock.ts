/** Whole minutes since the epoch: the window a request counts in. */
export function minuteOf(ms: number): number {
	return Math.floor(ms / 60_000);
}
