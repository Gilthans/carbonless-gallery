import type { Router } from "../../lib/router.js";
import { deletePayment, getPayment, listPayments } from "./payments.service.js";

export function registerPaymentsRoutes(router: Router): void {
	router.get("/billing/payments", (req) => listPayments(req.db, req.accountId, req.query.cursor));
	router.get("/billing/payments/:id", (req) => getPayment(req.db, req.accountId, req.params.id));
	router.delete("/billing/payments/:id", (req) => deletePayment(req.db, req.accountId, req.params.id));
}
