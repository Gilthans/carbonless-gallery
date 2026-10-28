import type { Router } from "../../lib/router.js";
import { deleteSatisfaction, getSatisfaction, listSatisfaction } from "./satisfaction.service.js";

export function registerSatisfactionRoutes(router: Router): void {
	router.get("/support/satisfaction", (req) => listSatisfaction(req.db, req.accountId, req.query.cursor));
	router.get("/support/satisfaction/:id", (req) => getSatisfaction(req.db, req.accountId, req.params.id));
	router.delete("/support/satisfaction/:id", (req) => deleteSatisfaction(req.db, req.accountId, req.params.id));
}
