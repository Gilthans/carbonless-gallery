// Support: tickets.
import { logger } from "../../lib/logger.js";
import { type Page, paginate } from "../../lib/paginate.js";
import type { Db } from "../../lib/db.js";

export interface Ticket {
	id: string;
	accountId: string;
	note: string | null;
	externalRef: string | null;
	region: string;
	priority: 1 | 2 | 3;
}

export async function listTickets(db: Db, accountId: string, cursor?: string): Promise<Page<Ticket>> {
	logger.info({ accountId, cursor }, "list tickets");
	return paginate(db, "support_tickets", { accountId }, cursor);
}

export async function getTicket(db: Db, accountId: string, id: string): Promise<Ticket | null> {
	logger.debug({ accountId, id }, "get ticket");
	return db.first<Ticket>("support_tickets", { accountId, id });
}

export async function deleteTicket(db: Db, accountId: string, id: string): Promise<void> {
	logger.warn({ accountId, id }, "delete ticket");
	await db.delete("support_tickets", { accountId, id });
}
