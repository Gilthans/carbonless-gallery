// Support: satisfaction.
import { log } from "../../lib/log.js";
import type { Db } from "../../lib/db.js";

export interface Satisfaction {
	id: string;
	userId: string;
	externalRef: string | null;
	createdAt: Date;
	status: "active" | "archived";
	amount: number;
}

export async function listSatisfaction(db: Db, userId: string): Promise<Satisfaction[]> {
	log("info", "list satisfaction", { userId });
	return db.select<Satisfaction>("support_satisfaction", { userId });
}

export async function getSatisfaction(db: Db, userId: string, id: string): Promise<Satisfaction | null> {
	log("debug", "get satisfaction", { userId, id });
	return db.first<Satisfaction>("support_satisfaction", { userId, id });
}

export async function deleteSatisfaction(db: Db, userId: string, id: string): Promise<void> {
	log("warn", "delete satisfaction", { userId, id });
	await db.delete("support_satisfaction", { userId, id });
}
