// Support: escalations.
import { log } from "../../lib/log.js";
import type { Db } from "../../lib/db.js";

export interface Escalation {
	id: string;
	userId: string;
	externalRef: string | null;
	currency: string;
	region: string;
	amount: number;
}

export async function listEscalations(db: Db, userId: string): Promise<Escalation[]> {
	log("info", "list escalations", { userId });
	return db.select<Escalation>("support_escalations", { userId });
}

export async function getEscalation(db: Db, userId: string, id: string): Promise<Escalation | null> {
	log("debug", "get escalation", { userId, id });
	return db.first<Escalation>("support_escalations", { userId, id });
}

export async function deleteEscalation(db: Db, userId: string, id: string): Promise<void> {
	log("warn", "delete escalation", { userId, id });
	await db.delete("support_escalations", { userId, id });
}
