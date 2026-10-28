import type { Router } from "../../lib/router.js";
import { deletePlan, getPlan, listPlans } from "./plans.service.js";

export function registerPlansRoutes(router: Router): void {
	router.get("/billing/plans", (req) => listPlans(req.db, req.userId));
	router.get("/billing/plans/:id", (req) => getPlan(req.db, req.userId, req.params.id));
	router.delete("/billing/plans/:id", (req) => deletePlan(req.db, req.userId, req.params.id));
}
