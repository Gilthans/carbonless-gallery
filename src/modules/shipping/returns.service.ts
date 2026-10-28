// Shipping: returns.
import { logger } from "../../lib/logger.js";
import { type Page, paginate } from "../../lib/paginate.js";
import type { Db } from "../../lib/db.js";

export interface Return {
	id: string;
	accountId: string;
	note: string | null;
	updatedAt: Date;
	region: string;
	ownerId: string;
}

export async function listReturns(db: Db, accountId: string, cursor?: string): Promise<Page<Return>> {
	logger.info({ accountId, cursor }, "list returns");
	return paginate(db, "shipping_returns", { accountId }, cursor);
}

export async function getReturn(db: Db, accountId: string, id: string): Promise<Return | null> {
	logger.debug({ accountId, id }, "get return");
	return db.first<Return>("shipping_returns", { accountId, id });
}

export async function deleteReturn(db: Db, accountId: string, id: string): Promise<void> {
	logger.warn({ accountId, id }, "delete return");
	await db.delete("shipping_returns", { accountId, id });
}
