type Level = "debug" | "info" | "warn" | "error";

export function log(level: Level, message: string, fields: Record<string, unknown> = {}): void {
	console[level === "debug" ? "log" : level](JSON.stringify({ level, message, ...fields, at: new Date().toISOString() }));
}
