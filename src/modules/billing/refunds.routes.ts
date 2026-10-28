import type { Router } from "../../lib/router.js";
import { deleteRefund, getRefund, listRefunds } from "./refunds.service.js";

export function registerRefundsRoutes(router: Router): void {
	router.get("/billing/refunds", (req) => listRefunds(req.db, req.accountId, req.query.cursor));
	router.get("/billing/refunds/:id", (req) => getRefund(req.db, req.accountId, req.params.id));
	router.delete("/billing/refunds/:id", (req) => deleteRefund(req.db, req.accountId, req.params.id));
}
