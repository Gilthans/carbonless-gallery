// Support: escalations.
import { logger } from "../../lib/logger.js";
import { type Page, paginate } from "../../lib/paginate.js";
import type { Db } from "../../lib/db.js";

export interface Escalation {
	id: string;
	accountId: string;
	externalRef: string | null;
	currency: string;
	region: string;
	amount: number;
}

export async function listEscalations(db: Db, accountId: string, cursor?: string): Promise<Page<Escalation>> {
	logger.info({ accountId, cursor }, "list escalations");
	return paginate(db, "support_escalations", { accountId }, cursor);
}

export async function getEscalation(db: Db, accountId: string, id: string): Promise<Escalation | null> {
	logger.debug({ accountId, id }, "get escalation");
	return db.first<Escalation>("support_escalations", { accountId, id });
}

export async function deleteEscalation(db: Db, accountId: string, id: string): Promise<void> {
	logger.warn({ accountId, id }, "delete escalation");
	await db.delete("support_escalations", { accountId, id });
}
