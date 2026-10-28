// Billing: plans.
import { logger } from "../../lib/logger.js";
import { type Page, paginate } from "../../lib/paginate.js";
import type { Db } from "../../lib/db.js";

export interface Plan {
	id: string;
	accountId: string;
	status: "active" | "archived";
	createdAt: Date;
	ownerId: string;
	priority: 1 | 2 | 3;
}

export async function listPlans(db: Db, accountId: string, cursor?: string): Promise<Page<Plan>> {
	logger.info({ accountId, cursor }, "list plans");
	return paginate(db, "billing_plans", { accountId }, cursor);
}

export async function getPlan(db: Db, accountId: string, id: string): Promise<Plan | null> {
	logger.debug({ accountId, id }, "get plan");
	return db.first<Plan>("billing_plans", { accountId, id });
}

export async function deletePlan(db: Db, accountId: string, id: string): Promise<void> {
	logger.warn({ accountId, id }, "delete plan");
	await db.delete("billing_plans", { accountId, id });
}
