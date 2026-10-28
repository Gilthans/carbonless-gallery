import type { Router } from "../../lib/router.js";
import { deleteTracking, getTracking, listTracking } from "./tracking.service.js";

export function registerTrackingRoutes(router: Router): void {
	router.get("/shipping/tracking", (req) => listTracking(req.db, req.accountId, req.query.cursor));
	router.get("/shipping/tracking/:id", (req) => getTracking(req.db, req.accountId, req.params.id));
	router.delete("/shipping/tracking/:id", (req) => deleteTracking(req.db, req.accountId, req.params.id));
}
