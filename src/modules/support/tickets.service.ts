// Support: tickets.
import { log } from "../../lib/log.js";
import type { Db } from "../../lib/db.js";

export interface Ticket {
	id: string;
	userId: string;
	note: string | null;
	externalRef: string | null;
	region: string;
	priority: 1 | 2 | 3;
}

export async function listTickets(db: Db, userId: string): Promise<Ticket[]> {
	log("info", "list tickets", { userId });
	return db.select<Ticket>("support_tickets", { userId });
}

export async function getTicket(db: Db, userId: string, id: string): Promise<Ticket | null> {
	log("debug", "get ticket", { userId, id });
	return db.first<Ticket>("support_tickets", { userId, id });
}

export async function deleteTicket(db: Db, userId: string, id: string): Promise<void> {
	log("warn", "delete ticket", { userId, id });
	await db.delete("support_tickets", { userId, id });
}
