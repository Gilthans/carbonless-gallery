// Shipping: tracking.
import { logger } from "../../lib/logger.js";
import { type Page, paginate } from "../../lib/paginate.js";
import type { Db } from "../../lib/db.js";

export interface Tracking {
	id: string;
	accountId: string;
	status: "active" | "archived";
	createdAt: Date;
	priority: 1 | 2 | 3;
	note: string | null;
}

export async function listTracking(db: Db, accountId: string, cursor?: string): Promise<Page<Tracking>> {
	logger.info({ accountId, cursor }, "list tracking");
	return paginate(db, "shipping_tracking", { accountId }, cursor);
}

export async function getTracking(db: Db, accountId: string, id: string): Promise<Tracking | null> {
	logger.debug({ accountId, id }, "get tracking");
	return db.first<Tracking>("shipping_tracking", { accountId, id });
}

export async function deleteTracking(db: Db, accountId: string, id: string): Promise<void> {
	logger.warn({ accountId, id }, "delete tracking");
	await db.delete("shipping_tracking", { accountId, id });
}
