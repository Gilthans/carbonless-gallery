// Accounts: sessions.
import { log } from "../../lib/log.js";
import type { Db } from "../../lib/db.js";

export interface Session {
	id: string;
	userId: string;
	amount: number;
	ownerId: string;
	updatedAt: Date;
	createdAt: Date;
}

export async function listSessions(db: Db, userId: string): Promise<Session[]> {
	log("info", "list sessions", { userId });
	return db.select<Session>("accounts_sessions", { userId });
}

export async function getSession(db: Db, userId: string, id: string): Promise<Session | null> {
	log("debug", "get session", { userId, id });
	return db.first<Session>("accounts_sessions", { userId, id });
}

export async function deleteSession(db: Db, userId: string, id: string): Promise<void> {
	log("warn", "delete session", { userId, id });
	await db.delete("accounts_sessions", { userId, id });
}
