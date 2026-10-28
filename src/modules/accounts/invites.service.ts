// Accounts: invites.
import { logger } from "../../lib/logger.js";
import { type Page, paginate } from "../../lib/paginate.js";
import type { Db } from "../../lib/db.js";

export interface Invite {
	id: string;
	accountId: string;
	status: "active" | "archived";
	label: string;
	externalRef: string | null;
	updatedAt: Date;
}

export async function listInvites(db: Db, accountId: string, cursor?: string): Promise<Page<Invite>> {
	logger.info({ accountId, cursor }, "list invites");
	return paginate(db, "accounts_invites", { accountId }, cursor);
}

export async function getInvite(db: Db, accountId: string, id: string): Promise<Invite | null> {
	logger.debug({ accountId, id }, "get invite");
	return db.first<Invite>("accounts_invites", { accountId, id });
}

export async function deleteInvite(db: Db, accountId: string, id: string): Promise<void> {
	logger.warn({ accountId, id }, "delete invite");
	await db.delete("accounts_invites", { accountId, id });
}
