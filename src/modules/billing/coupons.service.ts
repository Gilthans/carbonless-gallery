// Billing: coupons.
import { logger } from "../../lib/logger.js";
import { type Page, paginate } from "../../lib/paginate.js";
import type { Db } from "../../lib/db.js";

export interface Coupon {
	id: string;
	accountId: string;
	createdAt: Date;
	label: string;
	externalRef: string | null;
	ownerId: string;
}

export async function listCoupons(db: Db, accountId: string, cursor?: string): Promise<Page<Coupon>> {
	logger.info({ accountId, cursor }, "list coupons");
	return paginate(db, "billing_coupons", { accountId }, cursor);
}

export async function getCoupon(db: Db, accountId: string, id: string): Promise<Coupon | null> {
	logger.debug({ accountId, id }, "get coupon");
	return db.first<Coupon>("billing_coupons", { accountId, id });
}

export async function deleteCoupon(db: Db, accountId: string, id: string): Promise<void> {
	logger.warn({ accountId, id }, "delete coupon");
	await db.delete("billing_coupons", { accountId, id });
}
