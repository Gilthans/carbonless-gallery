// Accounts: roles.
import { log } from "../../lib/log.js";
import type { Db } from "../../lib/db.js";

export interface Role {
	id: string;
	userId: string;
	currency: string;
	amount: number;
	priority: 1 | 2 | 3;
	updatedAt: Date;
}

export async function listRoles(db: Db, userId: string): Promise<Role[]> {
	log("info", "list roles", { userId });
	return db.select<Role>("accounts_roles", { userId });
}

export async function getRole(db: Db, userId: string, id: string): Promise<Role | null> {
	log("debug", "get role", { userId, id });
	return db.first<Role>("accounts_roles", { userId, id });
}

export async function deleteRole(db: Db, userId: string, id: string): Promise<void> {
	log("warn", "delete role", { userId, id });
	await db.delete("accounts_roles", { userId, id });
}
