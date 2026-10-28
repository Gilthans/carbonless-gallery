// Billing: refunds.
import { log } from "../../lib/log.js";
import type { Db } from "../../lib/db.js";

export interface Refund {
	id: string;
	userId: string;
	currency: string;
	status: "active" | "archived";
	priority: 1 | 2 | 3;
	label: string;
}

export async function listRefunds(db: Db, userId: string): Promise<Refund[]> {
	log("info", "list refunds", { userId });
	return db.select<Refund>("billing_refunds", { userId });
}

export async function getRefund(db: Db, userId: string, id: string): Promise<Refund | null> {
	log("debug", "get refund", { userId, id });
	return db.first<Refund>("billing_refunds", { userId, id });
}

export async function deleteRefund(db: Db, userId: string, id: string): Promise<void> {
	log("warn", "delete refund", { userId, id });
	await db.delete("billing_refunds", { userId, id });
}
