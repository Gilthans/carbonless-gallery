// Accounts: users.
import { logger } from "../../lib/logger.js";
import { type Page, paginate } from "../../lib/paginate.js";
import type { Db } from "../../lib/db.js";

export interface User {
	id: string;
	accountId: string;
	status: "active" | "archived";
	currency: string;
	createdAt: Date;
	label: string;
}

export async function listUsers(db: Db, accountId: string, cursor?: string): Promise<Page<User>> {
	logger.info({ accountId, cursor }, "list users");
	return paginate(db, "accounts_users", { accountId }, cursor);
}

export async function getUser(db: Db, accountId: string, id: string): Promise<User | null> {
	logger.debug({ accountId, id }, "get user");
	return db.first<User>("accounts_users", { accountId, id });
}

export async function deleteUser(db: Db, accountId: string, id: string): Promise<void> {
	logger.warn({ accountId, id }, "delete user");
	await db.delete("accounts_users", { accountId, id });
}
