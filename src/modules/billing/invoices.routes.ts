import type { Router } from "../../lib/router.js";
import { deleteInvoice, getInvoice, listInvoices } from "./invoices.service.js";

export function registerInvoicesRoutes(router: Router): void {
	router.get("/billing/invoices", (req) => listInvoices(req.db, req.userId));
	router.get("/billing/invoices/:id", (req) => getInvoice(req.db, req.userId, req.params.id));
	router.delete("/billing/invoices/:id", (req) => deleteInvoice(req.db, req.userId, req.params.id));
}
