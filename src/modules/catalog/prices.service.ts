// Catalog: prices.
import { logger } from "../../lib/logger.js";
import { type Page, paginate } from "../../lib/paginate.js";
import type { Db } from "../../lib/db.js";

export interface Price {
	id: string;
	accountId: string;
	currency: string;
	label: string;
	region: string;
	ownerId: string;
}

export async function listPrices(db: Db, accountId: string, cursor?: string): Promise<Page<Price>> {
	logger.info({ accountId, cursor }, "list prices");
	return paginate(db, "catalog_prices", { accountId }, cursor);
}

export async function getPrice(db: Db, accountId: string, id: string): Promise<Price | null> {
	logger.debug({ accountId, id }, "get price");
	return db.first<Price>("catalog_prices", { accountId, id });
}

export async function deletePrice(db: Db, accountId: string, id: string): Promise<void> {
	logger.warn({ accountId, id }, "delete price");
	await db.delete("catalog_prices", { accountId, id });
}
