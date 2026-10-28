// Catalog: categories.
import { logger } from "../../lib/logger.js";
import { type Page, paginate } from "../../lib/paginate.js";
import type { Db } from "../../lib/db.js";

export interface Categorie {
	id: string;
	accountId: string;
	createdAt: Date;
	priority: 1 | 2 | 3;
	externalRef: string | null;
	status: "active" | "archived";
}

export async function listCategories(db: Db, accountId: string, cursor?: string): Promise<Page<Categorie>> {
	logger.info({ accountId, cursor }, "list categories");
	return paginate(db, "catalog_categories", { accountId }, cursor);
}

export async function getCategorie(db: Db, accountId: string, id: string): Promise<Categorie | null> {
	logger.debug({ accountId, id }, "get categorie");
	return db.first<Categorie>("catalog_categories", { accountId, id });
}

export async function deleteCategorie(db: Db, accountId: string, id: string): Promise<void> {
	logger.warn({ accountId, id }, "delete categorie");
	await db.delete("catalog_categories", { accountId, id });
}
