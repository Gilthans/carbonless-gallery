// Support: satisfaction.
import { logger } from "../../lib/logger.js";
import { type Page, paginate } from "../../lib/paginate.js";
import type { Db } from "../../lib/db.js";

export interface Satisfaction {
	id: string;
	accountId: string;
	externalRef: string | null;
	createdAt: Date;
	status: "active" | "archived";
	amount: number;
}

export async function listSatisfaction(db: Db, accountId: string, cursor?: string): Promise<Page<Satisfaction>> {
	logger.info({ accountId, cursor }, "list satisfaction");
	return paginate(db, "support_satisfaction", { accountId }, cursor);
}

export async function getSatisfaction(db: Db, accountId: string, id: string): Promise<Satisfaction | null> {
	logger.debug({ accountId, id }, "get satisfaction");
	return db.first<Satisfaction>("support_satisfaction", { accountId, id });
}

export async function deleteSatisfaction(db: Db, accountId: string, id: string): Promise<void> {
	logger.warn({ accountId, id }, "delete satisfaction");
	await db.delete("support_satisfaction", { accountId, id });
}
