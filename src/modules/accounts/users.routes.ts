import type { Router } from "../../lib/router.js";
import { deleteUser, getUser, listUsers } from "./users.service.js";

export function registerUsersRoutes(router: Router): void {
	router.get("/accounts/users", (req) => listUsers(req.db, req.userId));
	router.get("/accounts/users/:id", (req) => getUser(req.db, req.userId, req.params.id));
	router.delete("/accounts/users/:id", (req) => deleteUser(req.db, req.userId, req.params.id));
}
