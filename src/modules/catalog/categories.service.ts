// Catalog: categories.
import { log } from "../../lib/log.js";
import type { Db } from "../../lib/db.js";

export interface Categorie {
	id: string;
	userId: string;
	createdAt: Date;
	priority: 1 | 2 | 3;
	externalRef: string | null;
	status: "active" | "archived";
}

export async function listCategories(db: Db, userId: string): Promise<Categorie[]> {
	log("info", "list categories", { userId });
	return db.select<Categorie>("catalog_categories", { userId });
}

export async function getCategorie(db: Db, userId: string, id: string): Promise<Categorie | null> {
	log("debug", "get categorie", { userId, id });
	return db.first<Categorie>("catalog_categories", { userId, id });
}

export async function deleteCategorie(db: Db, userId: string, id: string): Promise<void> {
	log("warn", "delete categorie", { userId, id });
	await db.delete("catalog_categories", { userId, id });
}
