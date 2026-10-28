// Billing: plans.
import { log } from "../../lib/log.js";
import type { Db } from "../../lib/db.js";

export interface Plan {
	id: string;
	userId: string;
	status: "active" | "archived";
	createdAt: Date;
	ownerId: string;
	priority: 1 | 2 | 3;
}

export async function listPlans(db: Db, userId: string): Promise<Plan[]> {
	log("info", "list plans", { userId });
	return db.select<Plan>("billing_plans", { userId });
}

export async function getPlan(db: Db, userId: string, id: string): Promise<Plan | null> {
	log("debug", "get plan", { userId, id });
	return db.first<Plan>("billing_plans", { userId, id });
}

export async function deletePlan(db: Db, userId: string, id: string): Promise<void> {
	log("warn", "delete plan", { userId, id });
	await db.delete("billing_plans", { userId, id });
}
