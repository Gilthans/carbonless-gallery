import type { Router } from "../../lib/router.js";
import { deleteCarrier, getCarrier, listCarriers } from "./carriers.service.js";

export function registerCarriersRoutes(router: Router): void {
	router.get("/shipping/carriers", (req) => listCarriers(req.db, req.userId));
	router.get("/shipping/carriers/:id", (req) => getCarrier(req.db, req.userId, req.params.id));
	router.delete("/shipping/carriers/:id", (req) => deleteCarrier(req.db, req.userId, req.params.id));
}
