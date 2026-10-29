/** `widget one` → `Widget One`. */
export function titleCase(s: string): string {
	return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Cuts `s` to `max` characters, with an ellipsis when it was longer. */
export function truncate(s: string, max: number): string {
	return s.length <= max ? s : `${s.slice(0, max - 1)}…`;
}
