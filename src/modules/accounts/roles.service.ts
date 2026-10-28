// Accounts: roles.
import { logger } from "../../lib/logger.js";
import { type Page, paginate } from "../../lib/paginate.js";
import type { Db } from "../../lib/db.js";

export interface Role {
	id: string;
	accountId: string;
	currency: string;
	amount: number;
	priority: 1 | 2 | 3;
	updatedAt: Date;
}

export async function listRoles(db: Db, accountId: string, cursor?: string): Promise<Page<Role>> {
	logger.info({ accountId, cursor }, "list roles");
	return paginate(db, "accounts_roles", { accountId }, cursor);
}

export async function getRole(db: Db, accountId: string, id: string): Promise<Role | null> {
	logger.debug({ accountId, id }, "get role");
	return db.first<Role>("accounts_roles", { accountId, id });
}

export async function deleteRole(db: Db, accountId: string, id: string): Promise<void> {
	logger.warn({ accountId, id }, "delete role");
	await db.delete("accounts_roles", { accountId, id });
}
