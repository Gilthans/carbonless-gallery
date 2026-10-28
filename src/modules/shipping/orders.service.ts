// Shipping: orders.
import { log } from "../../lib/log.js";
import type { Db } from "../../lib/db.js";

export interface Order {
	id: string;
	userId: string;
	createdAt: Date;
	currency: string;
	amount: number;
	region: string;
}

export async function listOrders(db: Db, userId: string): Promise<Order[]> {
	log("info", "list orders", { userId });
	return db.select<Order>("shipping_orders", { userId });
}

export async function getOrder(db: Db, userId: string, id: string): Promise<Order | null> {
	log("debug", "get order", { userId, id });
	return db.first<Order>("shipping_orders", { userId, id });
}

export async function deleteOrder(db: Db, userId: string, id: string): Promise<void> {
	log("warn", "delete order", { userId, id });
	await db.delete("shipping_orders", { userId, id });
}
