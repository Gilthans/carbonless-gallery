// Catalog: inventory.
import { log } from "../../lib/log.js";
import type { Db } from "../../lib/db.js";

export interface Inventory {
	id: string;
	userId: string;
	note: string | null;
	region: string;
	currency: string;
	externalRef: string | null;
}

export async function listInventory(db: Db, userId: string): Promise<Inventory[]> {
	log("info", "list inventory", { userId });
	return db.select<Inventory>("catalog_inventory", { userId });
}

export async function getInventory(db: Db, userId: string, id: string): Promise<Inventory | null> {
	log("debug", "get inventory", { userId, id });
	return db.first<Inventory>("catalog_inventory", { userId, id });
}

export async function deleteInventory(db: Db, userId: string, id: string): Promise<void> {
	log("warn", "delete inventory", { userId, id });
	await db.delete("catalog_inventory", { userId, id });
}
