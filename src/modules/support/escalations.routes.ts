import type { Router } from "../../lib/router.js";
import { deleteEscalation, getEscalation, listEscalations } from "./escalations.service.js";

export function registerEscalationsRoutes(router: Router): void {
	router.get("/support/escalations", (req) => listEscalations(req.db, req.userId));
	router.get("/support/escalations/:id", (req) => getEscalation(req.db, req.userId, req.params.id));
	router.delete("/support/escalations/:id", (req) => deleteEscalation(req.db, req.userId, req.params.id));
}
