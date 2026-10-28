// Catalog: reviews.
import { logger } from "../../lib/logger.js";
import { type Page, paginate } from "../../lib/paginate.js";
import type { Db } from "../../lib/db.js";

export interface Review {
	id: string;
	accountId: string;
	amount: number;
	label: string;
	updatedAt: Date;
	currency: string;
}

export async function listReviews(db: Db, accountId: string, cursor?: string): Promise<Page<Review>> {
	logger.info({ accountId, cursor }, "list reviews");
	return paginate(db, "catalog_reviews", { accountId }, cursor);
}

export async function getReview(db: Db, accountId: string, id: string): Promise<Review | null> {
	logger.debug({ accountId, id }, "get review");
	return db.first<Review>("catalog_reviews", { accountId, id });
}

export async function deleteReview(db: Db, accountId: string, id: string): Promise<void> {
	logger.warn({ accountId, id }, "delete review");
	await db.delete("catalog_reviews", { accountId, id });
}
