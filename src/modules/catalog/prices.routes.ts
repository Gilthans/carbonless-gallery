import type { Router } from "../../lib/router.js";
import { deletePrice, getPrice, listPrices } from "./prices.service.js";

export function registerPricesRoutes(router: Router): void {
	router.get("/catalog/prices", (req) => listPrices(req.db, req.userId));
	router.get("/catalog/prices/:id", (req) => getPrice(req.db, req.userId, req.params.id));
	router.delete("/catalog/prices/:id", (req) => deletePrice(req.db, req.userId, req.params.id));
}
