// Accounts: users.
import { log } from "../../lib/log.js";
import type { Db } from "../../lib/db.js";

export interface User {
	id: string;
	userId: string;
	status: "active" | "archived";
	currency: string;
	createdAt: Date;
	label: string;
}

export async function listUsers(db: Db, userId: string): Promise<User[]> {
	log("info", "list users", { userId });
	return db.select<User>("accounts_users", { userId });
}

export async function getUser(db: Db, userId: string, id: string): Promise<User | null> {
	log("debug", "get user", { userId, id });
	return db.first<User>("accounts_users", { userId, id });
}

export async function deleteUser(db: Db, userId: string, id: string): Promise<void> {
	log("warn", "delete user", { userId, id });
	await db.delete("accounts_users", { userId, id });
}
