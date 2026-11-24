import { start } from "./server";

export function main() {
	start(8080);
}

export function stop() {
	process.exit(0);
}

export const VERSION = "1.0";
