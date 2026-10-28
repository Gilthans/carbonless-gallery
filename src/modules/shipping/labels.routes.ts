import type { Router } from "../../lib/router.js";
import { deleteLabel, getLabel, listLabels } from "./labels.service.js";

export function registerLabelsRoutes(router: Router): void {
	router.get("/shipping/labels", (req) => listLabels(req.db, req.userId));
	router.get("/shipping/labels/:id", (req) => getLabel(req.db, req.userId, req.params.id));
	router.delete("/shipping/labels/:id", (req) => deleteLabel(req.db, req.userId, req.params.id));
}
