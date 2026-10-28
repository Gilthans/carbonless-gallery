// Shipping: carriers.
import { logger } from "../../lib/logger.js";
import { type Page, paginate } from "../../lib/paginate.js";
import type { Db } from "../../lib/db.js";

export interface Carrier {
	id: string;
	accountId: string;
	note: string | null;
	region: string;
	amount: number;
	createdAt: Date;
}

export async function listCarriers(db: Db, accountId: string, cursor?: string): Promise<Page<Carrier>> {
	logger.info({ accountId, cursor }, "list carriers");
	return paginate(db, "shipping_carriers", { accountId }, cursor);
}

export async function getCarrier(db: Db, accountId: string, id: string): Promise<Carrier | null> {
	logger.debug({ accountId, id }, "get carrier");
	return db.first<Carrier>("shipping_carriers", { accountId, id });
}

export async function deleteCarrier(db: Db, accountId: string, id: string): Promise<void> {
	logger.warn({ accountId, id }, "delete carrier");
	await db.delete("shipping_carriers", { accountId, id });
}
