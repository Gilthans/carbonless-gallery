import type { Router } from "../../lib/router.js";
import { deleteInventory, getInventory, listInventory } from "./inventory.service.js";

export function registerInventoryRoutes(router: Router): void {
	router.get("/catalog/inventory", (req) => listInventory(req.db, req.userId));
	router.get("/catalog/inventory/:id", (req) => getInventory(req.db, req.userId, req.params.id));
	router.delete("/catalog/inventory/:id", (req) => deleteInventory(req.db, req.userId, req.params.id));
}
