// Shipping: labels.
import { log } from "../../lib/log.js";
import type { Db } from "../../lib/db.js";

export interface Label {
	id: string;
	userId: string;
	createdAt: Date;
	priority: 1 | 2 | 3;
	ownerId: string;
	updatedAt: Date;
}

export async function listLabels(db: Db, userId: string): Promise<Label[]> {
	log("info", "list labels", { userId });
	return db.select<Label>("shipping_labels", { userId });
}

export async function getLabel(db: Db, userId: string, id: string): Promise<Label | null> {
	log("debug", "get label", { userId, id });
	return db.first<Label>("shipping_labels", { userId, id });
}

export async function deleteLabel(db: Db, userId: string, id: string): Promise<void> {
	log("warn", "delete label", { userId, id });
	await db.delete("shipping_labels", { userId, id });
}
