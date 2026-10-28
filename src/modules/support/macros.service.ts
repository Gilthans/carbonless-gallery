// Support: macros.
import { log } from "../../lib/log.js";
import type { Db } from "../../lib/db.js";

export interface Macro {
	id: string;
	userId: string;
	createdAt: Date;
	externalRef: string | null;
	amount: number;
	region: string;
}

export async function listMacros(db: Db, userId: string): Promise<Macro[]> {
	log("info", "list macros", { userId });
	return db.select<Macro>("support_macros", { userId });
}

export async function getMacro(db: Db, userId: string, id: string): Promise<Macro | null> {
	log("debug", "get macro", { userId, id });
	return db.first<Macro>("support_macros", { userId, id });
}

export async function deleteMacro(db: Db, userId: string, id: string): Promise<void> {
	log("warn", "delete macro", { userId, id });
	await db.delete("support_macros", { userId, id });
}
