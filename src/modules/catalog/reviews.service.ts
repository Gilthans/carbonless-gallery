// Catalog: reviews.
import { log } from "../../lib/log.js";
import type { Db } from "../../lib/db.js";

export interface Review {
	id: string;
	userId: string;
	amount: number;
	label: string;
	updatedAt: Date;
	currency: string;
}

export async function listReviews(db: Db, userId: string): Promise<Review[]> {
	log("info", "list reviews", { userId });
	return db.select<Review>("catalog_reviews", { userId });
}

export async function getReview(db: Db, userId: string, id: string): Promise<Review | null> {
	log("debug", "get review", { userId, id });
	return db.first<Review>("catalog_reviews", { userId, id });
}

export async function deleteReview(db: Db, userId: string, id: string): Promise<void> {
	log("warn", "delete review", { userId, id });
	await db.delete("catalog_reviews", { userId, id });
}
