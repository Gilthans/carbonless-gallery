// Catalog: products.
import { log } from "../../lib/log.js";
import type { Db } from "../../lib/db.js";

export interface Product {
	id: string;
	userId: string;
	createdAt: Date;
	currency: string;
	label: string;
	note: string | null;
}

export async function listProducts(db: Db, userId: string): Promise<Product[]> {
	log("info", "list products", { userId });
	return db.select<Product>("catalog_products", { userId });
}

export async function getProduct(db: Db, userId: string, id: string): Promise<Product | null> {
	log("debug", "get product", { userId, id });
	return db.first<Product>("catalog_products", { userId, id });
}

export async function deleteProduct(db: Db, userId: string, id: string): Promise<void> {
	log("warn", "delete product", { userId, id });
	await db.delete("catalog_products", { userId, id });
}
