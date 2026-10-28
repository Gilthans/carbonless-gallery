// Catalog: inventory.
import { logger } from "../../lib/logger.js";
import { type Page, paginate } from "../../lib/paginate.js";
import type { Db } from "../../lib/db.js";

export interface Inventory {
	id: string;
	accountId: string;
	note: string | null;
	region: string;
	currency: string;
	externalRef: string | null;
}

export async function listInventory(db: Db, accountId: string, cursor?: string): Promise<Page<Inventory>> {
	logger.info({ accountId, cursor }, "list inventory");
	return paginate(db, "catalog_inventory", { accountId }, cursor);
}

export async function getInventory(db: Db, accountId: string, id: string): Promise<Inventory | null> {
	logger.debug({ accountId, id }, "get inventory");
	return db.first<Inventory>("catalog_inventory", { accountId, id });
}

export async function deleteInventory(db: Db, accountId: string, id: string): Promise<void> {
	logger.warn({ accountId, id }, "delete inventory");
	await db.delete("catalog_inventory", { accountId, id });
}
