// Billing: payments.
import { log } from "../../lib/log.js";
import type { Db } from "../../lib/db.js";

export interface Payment {
	id: string;
	userId: string;
	createdAt: Date;
	priority: 1 | 2 | 3;
	externalRef: string | null;
	note: string | null;
}

export async function listPayments(db: Db, userId: string): Promise<Payment[]> {
	log("info", "list payments", { userId });
	return db.select<Payment>("billing_payments", { userId });
}

export async function getPayment(db: Db, userId: string, id: string): Promise<Payment | null> {
	log("debug", "get payment", { userId, id });
	return db.first<Payment>("billing_payments", { userId, id });
}

export async function deletePayment(db: Db, userId: string, id: string): Promise<void> {
	log("warn", "delete payment", { userId, id });
	await db.delete("billing_payments", { userId, id });
}
