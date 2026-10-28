// Accounts: sessions.
import { logger } from "../../lib/logger.js";
import { type Page, paginate } from "../../lib/paginate.js";
import type { Db } from "../../lib/db.js";

export interface Session {
	id: string;
	accountId: string;
	amount: number;
	ownerId: string;
	updatedAt: Date;
	createdAt: Date;
}

export async function listSessions(db: Db, accountId: string, cursor?: string): Promise<Page<Session>> {
	logger.info({ accountId, cursor }, "list sessions");
	return paginate(db, "accounts_sessions", { accountId }, cursor);
}

export async function getSession(db: Db, accountId: string, id: string): Promise<Session | null> {
	logger.debug({ accountId, id }, "get session");
	return db.first<Session>("accounts_sessions", { accountId, id });
}

export async function deleteSession(db: Db, accountId: string, id: string): Promise<void> {
	logger.warn({ accountId, id }, "delete session");
	await db.delete("accounts_sessions", { accountId, id });
}
