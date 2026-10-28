import type { Router } from "../../lib/router.js";
import { deleteInventory, getInventory, listInventory } from "./inventory.service.js";

export function registerInventoryRoutes(router: Router): void {
	router.get("/catalog/inventory", (req) => listInventory(req.db, req.accountId, req.query.cursor));
	router.get("/catalog/inventory/:id", (req) => getInventory(req.db, req.accountId, req.params.id));
	router.delete("/catalog/inventory/:id", (req) => deleteInventory(req.db, req.accountId, req.params.id));
}
