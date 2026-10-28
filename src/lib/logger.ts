import pino from "pino";

/** Structured logs: fields first, then the message (pino order). */
export const logger = pino({ level: process.env.LOG_LEVEL ?? "info", redact: ["*.token", "*.password"] });
