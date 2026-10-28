// Shipping: orders.
import { logger } from "../../lib/logger.js";
import { type Page, paginate } from "../../lib/paginate.js";
import type { Db } from "../../lib/db.js";

export interface Order {
	id: string;
	accountId: string;
	createdAt: Date;
	currency: string;
	amount: number;
	region: string;
}

export async function listOrders(db: Db, accountId: string, cursor?: string): Promise<Page<Order>> {
	logger.info({ accountId, cursor }, "list orders");
	return paginate(db, "shipping_orders", { accountId }, cursor);
}

export async function getOrder(db: Db, accountId: string, id: string): Promise<Order | null> {
	logger.debug({ accountId, id }, "get order");
	return db.first<Order>("shipping_orders", { accountId, id });
}

export async function deleteOrder(db: Db, accountId: string, id: string): Promise<void> {
	logger.warn({ accountId, id }, "delete order");
	await db.delete("shipping_orders", { accountId, id });
}
