// Accounts: invites.
import { log } from "../../lib/log.js";
import type { Db } from "../../lib/db.js";

export interface Invite {
	id: string;
	userId: string;
	status: "active" | "archived";
	label: string;
	externalRef: string | null;
	updatedAt: Date;
}

export async function listInvites(db: Db, userId: string): Promise<Invite[]> {
	log("info", "list invites", { userId });
	return db.select<Invite>("accounts_invites", { userId });
}

export async function getInvite(db: Db, userId: string, id: string): Promise<Invite | null> {
	log("debug", "get invite", { userId, id });
	return db.first<Invite>("accounts_invites", { userId, id });
}

export async function deleteInvite(db: Db, userId: string, id: string): Promise<void> {
	log("warn", "delete invite", { userId, id });
	await db.delete("accounts_invites", { userId, id });
}
