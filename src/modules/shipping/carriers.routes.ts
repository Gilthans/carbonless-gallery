import type { Router } from "../../lib/router.js";
import { deleteCarrier, getCarrier, listCarriers } from "./carriers.service.js";

export function registerCarriersRoutes(router: Router): void {
	router.get("/shipping/carriers", (req) => listCarriers(req.db, req.accountId, req.query.cursor));
	router.get("/shipping/carriers/:id", (req) => getCarrier(req.db, req.accountId, req.params.id));
	router.delete("/shipping/carriers/:id", (req) => deleteCarrier(req.db, req.accountId, req.params.id));
}
