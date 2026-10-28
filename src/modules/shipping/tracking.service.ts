// Shipping: tracking.
import { log } from "../../lib/log.js";
import type { Db } from "../../lib/db.js";

export interface Tracking {
	id: string;
	userId: string;
	status: "active" | "archived";
	createdAt: Date;
	priority: 1 | 2 | 3;
	note: string | null;
}

export async function listTracking(db: Db, userId: string): Promise<Tracking[]> {
	log("info", "list tracking", { userId });
	return db.select<Tracking>("shipping_tracking", { userId });
}

export async function getTracking(db: Db, userId: string, id: string): Promise<Tracking | null> {
	log("debug", "get tracking", { userId, id });
	return db.first<Tracking>("shipping_tracking", { userId, id });
}

export async function deleteTracking(db: Db, userId: string, id: string): Promise<void> {
	log("warn", "delete tracking", { userId, id });
	await db.delete("shipping_tracking", { userId, id });
}
