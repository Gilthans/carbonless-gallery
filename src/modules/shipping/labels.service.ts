// Shipping: labels.
import { logger } from "../../lib/logger.js";
import { type Page, paginate } from "../../lib/paginate.js";
import type { Db } from "../../lib/db.js";

export interface Label {
	id: string;
	accountId: string;
	createdAt: Date;
	priority: 1 | 2 | 3;
	ownerId: string;
	updatedAt: Date;
}

export async function listLabels(db: Db, accountId: string, cursor?: string): Promise<Page<Label>> {
	logger.info({ accountId, cursor }, "list labels");
	return paginate(db, "shipping_labels", { accountId }, cursor);
}

export async function getLabel(db: Db, accountId: string, id: string): Promise<Label | null> {
	logger.debug({ accountId, id }, "get label");
	return db.first<Label>("shipping_labels", { accountId, id });
}

export async function deleteLabel(db: Db, accountId: string, id: string): Promise<void> {
	logger.warn({ accountId, id }, "delete label");
	await db.delete("shipping_labels", { accountId, id });
}
