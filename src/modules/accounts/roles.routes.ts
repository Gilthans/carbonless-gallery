import type { Router } from "../../lib/router.js";
import { deleteRole, getRole, listRoles } from "./roles.service.js";

export function registerRolesRoutes(router: Router): void {
	router.get("/accounts/roles", (req) => listRoles(req.db, req.userId));
	router.get("/accounts/roles/:id", (req) => getRole(req.db, req.userId, req.params.id));
	router.delete("/accounts/roles/:id", (req) => deleteRole(req.db, req.userId, req.params.id));
}
