import type { Router } from "../../lib/router.js";
import { deleteMacro, getMacro, listMacros } from "./macros.service.js";

export function registerMacrosRoutes(router: Router): void {
	router.get("/support/macros", (req) => listMacros(req.db, req.accountId, req.query.cursor));
	router.get("/support/macros/:id", (req) => getMacro(req.db, req.accountId, req.params.id));
	router.delete("/support/macros/:id", (req) => deleteMacro(req.db, req.accountId, req.params.id));
}
