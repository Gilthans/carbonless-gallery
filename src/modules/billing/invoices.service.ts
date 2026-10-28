// Billing: invoices.
import { logger } from "../../lib/logger.js";
import { type Page, paginate } from "../../lib/paginate.js";
import type { Db } from "../../lib/db.js";

export interface Invoice {
	id: string;
	accountId: string;
	note: string | null;
	updatedAt: Date;
	ownerId: string;
	status: "active" | "archived";
}

export async function listInvoices(db: Db, accountId: string, cursor?: string): Promise<Page<Invoice>> {
	logger.info({ accountId, cursor }, "list invoices");
	return paginate(db, "billing_invoices", { accountId }, cursor);
}

export async function getInvoice(db: Db, accountId: string, id: string): Promise<Invoice | null> {
	logger.debug({ accountId, id }, "get invoice");
	return db.first<Invoice>("billing_invoices", { accountId, id });
}

export async function deleteInvoice(db: Db, accountId: string, id: string): Promise<void> {
	logger.warn({ accountId, id }, "delete invoice");
	await db.delete("billing_invoices", { accountId, id });
}
