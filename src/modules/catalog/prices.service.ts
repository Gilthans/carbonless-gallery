// Catalog: prices.
import { log } from "../../lib/log.js";
import type { Db } from "../../lib/db.js";

export interface Price {
	id: string;
	userId: string;
	currency: string;
	label: string;
	region: string;
	ownerId: string;
}

export async function listPrices(db: Db, userId: string): Promise<Price[]> {
	log("info", "list prices", { userId });
	return db.select<Price>("catalog_prices", { userId });
}

export async function getPrice(db: Db, userId: string, id: string): Promise<Price | null> {
	log("debug", "get price", { userId, id });
	return db.first<Price>("catalog_prices", { userId, id });
}

export async function deletePrice(db: Db, userId: string, id: string): Promise<void> {
	log("warn", "delete price", { userId, id });
	await db.delete("catalog_prices", { userId, id });
}
