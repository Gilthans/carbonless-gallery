import type { Router } from "../../lib/router.js";
import { deleteReturn, getReturn, listReturns } from "./returns.service.js";

export function registerReturnsRoutes(router: Router): void {
	router.get("/shipping/returns", (req) => listReturns(req.db, req.accountId, req.query.cursor));
	router.get("/shipping/returns/:id", (req) => getReturn(req.db, req.accountId, req.params.id));
	router.delete("/shipping/returns/:id", (req) => deleteReturn(req.db, req.accountId, req.params.id));
}
