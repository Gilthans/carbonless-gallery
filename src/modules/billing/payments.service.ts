// Billing: payments.
import { logger } from "../../lib/logger.js";
import { type Page, paginate } from "../../lib/paginate.js";
import type { Db } from "../../lib/db.js";

export interface Payment {
	id: string;
	accountId: string;
	createdAt: Date;
	priority: 1 | 2 | 3;
	externalRef: string | null;
	note: string | null;
}

export async function listPayments(db: Db, accountId: string, cursor?: string): Promise<Page<Payment>> {
	logger.info({ accountId, cursor }, "list payments");
	return paginate(db, "billing_payments", { accountId }, cursor);
}

export async function getPayment(db: Db, accountId: string, id: string): Promise<Payment | null> {
	logger.debug({ accountId, id }, "get payment");
	return db.first<Payment>("billing_payments", { accountId, id });
}

export async function deletePayment(db: Db, accountId: string, id: string): Promise<void> {
	logger.warn({ accountId, id }, "delete payment");
	await db.delete("billing_payments", { accountId, id });
}
