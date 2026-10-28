// Catalog: products.
import { logger } from "../../lib/logger.js";
import { type Page, paginate } from "../../lib/paginate.js";
import type { Db } from "../../lib/db.js";

export interface Product {
	id: string;
	accountId: string;
	createdAt: Date;
	currency: string;
	label: string;
	note: string | null;
}

export async function listProducts(db: Db, accountId: string, cursor?: string): Promise<Page<Product>> {
	logger.info({ accountId, cursor }, "list products");
	return paginate(db, "catalog_products", { accountId }, cursor);
}

export async function getProduct(db: Db, accountId: string, id: string): Promise<Product | null> {
	logger.debug({ accountId, id }, "get product");
	return db.first<Product>("catalog_products", { accountId, id });
}

export async function deleteProduct(db: Db, accountId: string, id: string): Promise<void> {
	logger.warn({ accountId, id }, "delete product");
	await db.delete("catalog_products", { accountId, id });
}
