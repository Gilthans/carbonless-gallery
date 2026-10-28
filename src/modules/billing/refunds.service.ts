// Billing: refunds.
import { logger } from "../../lib/logger.js";
import { type Page, paginate } from "../../lib/paginate.js";
import type { Db } from "../../lib/db.js";

export interface Refund {
	id: string;
	accountId: string;
	currency: string;
	status: "active" | "archived";
	priority: 1 | 2 | 3;
	label: string;
}

export async function listRefunds(db: Db, accountId: string, cursor?: string): Promise<Page<Refund>> {
	logger.info({ accountId, cursor }, "list refunds");
	return paginate(db, "billing_refunds", { accountId }, cursor);
}

export async function getRefund(db: Db, accountId: string, id: string): Promise<Refund | null> {
	logger.debug({ accountId, id }, "get refund");
	return db.first<Refund>("billing_refunds", { accountId, id });
}

export async function deleteRefund(db: Db, accountId: string, id: string): Promise<void> {
	logger.warn({ accountId, id }, "delete refund");
	await db.delete("billing_refunds", { accountId, id });
}
