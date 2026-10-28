// Billing: invoices.
import { log } from "../../lib/log.js";
import type { Db } from "../../lib/db.js";

export interface Invoice {
	id: string;
	userId: string;
	note: string | null;
	updatedAt: Date;
	ownerId: string;
	status: "active" | "archived";
}

export async function listInvoices(db: Db, userId: string): Promise<Invoice[]> {
	log("info", "list invoices", { userId });
	return db.select<Invoice>("billing_invoices", { userId });
}

export async function getInvoice(db: Db, userId: string, id: string): Promise<Invoice | null> {
	log("debug", "get invoice", { userId, id });
	return db.first<Invoice>("billing_invoices", { userId, id });
}

export async function deleteInvoice(db: Db, userId: string, id: string): Promise<void> {
	log("warn", "delete invoice", { userId, id });
	await db.delete("billing_invoices", { userId, id });
}
