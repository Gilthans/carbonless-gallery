import type { Router } from "../../lib/router.js";
import { deleteTeam, getTeam, listTeams } from "./teams.service.js";

export function registerTeamsRoutes(router: Router): void {
	router.get("/accounts/teams", (req) => listTeams(req.db, req.accountId, req.query.cursor));
	router.get("/accounts/teams/:id", (req) => getTeam(req.db, req.accountId, req.params.id));
	router.delete("/accounts/teams/:id", (req) => deleteTeam(req.db, req.accountId, req.params.id));
}
