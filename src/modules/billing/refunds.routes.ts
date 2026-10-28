import type { Router } from "../../lib/router.js";
import { deleteRefund, getRefund, listRefunds } from "./refunds.service.js";

export function registerRefundsRoutes(router: Router): void {
	router.get("/billing/refunds", (req) => listRefunds(req.db, req.userId));
	router.get("/billing/refunds/:id", (req) => getRefund(req.db, req.userId, req.params.id));
	router.delete("/billing/refunds/:id", (req) => deleteRefund(req.db, req.userId, req.params.id));
}
