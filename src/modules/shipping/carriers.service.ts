// Shipping: carriers.
import { log } from "../../lib/log.js";
import type { Db } from "../../lib/db.js";

export interface Carrier {
	id: string;
	userId: string;
	note: string | null;
	region: string;
	amount: number;
	createdAt: Date;
}

export async function listCarriers(db: Db, userId: string): Promise<Carrier[]> {
	log("info", "list carriers", { userId });
	return db.select<Carrier>("shipping_carriers", { userId });
}

export async function getCarrier(db: Db, userId: string, id: string): Promise<Carrier | null> {
	log("debug", "get carrier", { userId, id });
	return db.first<Carrier>("shipping_carriers", { userId, id });
}

export async function deleteCarrier(db: Db, userId: string, id: string): Promise<void> {
	log("warn", "delete carrier", { userId, id });
	await db.delete("shipping_carriers", { userId, id });
}
