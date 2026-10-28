// Shipping: returns.
import { log } from "../../lib/log.js";
import type { Db } from "../../lib/db.js";

export interface Return {
	id: string;
	userId: string;
	note: string | null;
	updatedAt: Date;
	region: string;
	ownerId: string;
}

export async function listReturns(db: Db, userId: string): Promise<Return[]> {
	log("info", "list returns", { userId });
	return db.select<Return>("shipping_returns", { userId });
}

export async function getReturn(db: Db, userId: string, id: string): Promise<Return | null> {
	log("debug", "get return", { userId, id });
	return db.first<Return>("shipping_returns", { userId, id });
}

export async function deleteReturn(db: Db, userId: string, id: string): Promise<void> {
	log("warn", "delete return", { userId, id });
	await db.delete("shipping_returns", { userId, id });
}
