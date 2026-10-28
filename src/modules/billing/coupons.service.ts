// Billing: coupons.
import { log } from "../../lib/log.js";
import type { Db } from "../../lib/db.js";

export interface Coupon {
	id: string;
	userId: string;
	createdAt: Date;
	label: string;
	externalRef: string | null;
	ownerId: string;
}

export async function listCoupons(db: Db, userId: string): Promise<Coupon[]> {
	log("info", "list coupons", { userId });
	return db.select<Coupon>("billing_coupons", { userId });
}

export async function getCoupon(db: Db, userId: string, id: string): Promise<Coupon | null> {
	log("debug", "get coupon", { userId, id });
	return db.first<Coupon>("billing_coupons", { userId, id });
}

export async function deleteCoupon(db: Db, userId: string, id: string): Promise<void> {
	log("warn", "delete coupon", { userId, id });
	await db.delete("billing_coupons", { userId, id });
}
