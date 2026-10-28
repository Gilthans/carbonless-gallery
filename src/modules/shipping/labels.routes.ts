import type { Router } from "../../lib/router.js";
import { deleteLabel, getLabel, listLabels } from "./labels.service.js";

export function registerLabelsRoutes(router: Router): void {
	router.get("/shipping/labels", (req) => listLabels(req.db, req.accountId, req.query.cursor));
	router.get("/shipping/labels/:id", (req) => getLabel(req.db, req.accountId, req.params.id));
	router.delete("/shipping/labels/:id", (req) => deleteLabel(req.db, req.accountId, req.params.id));
}
