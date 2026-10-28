import type { Db } from "./db.js";

export interface Request {
	db: Db;
	accountId: string;
	query: Record<string, string | undefined>;
	params: Record<string, string>;
}

export interface Router {
	get(path: string, handler: (req: Request) => unknown): void;
	delete(path: string, handler: (req: Request) => unknown): void;
}
