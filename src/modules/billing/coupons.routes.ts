import type { Router } from "../../lib/router.js";
import { deleteCoupon, getCoupon, listCoupons } from "./coupons.service.js";

export function registerCouponsRoutes(router: Router): void {
	router.get("/billing/coupons", (req) => listCoupons(req.db, req.userId));
	router.get("/billing/coupons/:id", (req) => getCoupon(req.db, req.userId, req.params.id));
	router.delete("/billing/coupons/:id", (req) => deleteCoupon(req.db, req.userId, req.params.id));
}
