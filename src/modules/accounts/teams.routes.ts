import type { Router } from "../../lib/router.js";
import { deleteTeam, getTeam, listTeams } from "./teams.service.js";

export function registerTeamsRoutes(router: Router): void {
	router.get("/accounts/teams", (req) => listTeams(req.db, req.userId));
	router.get("/accounts/teams/:id", (req) => getTeam(req.db, req.userId, req.params.id));
	router.delete("/accounts/teams/:id", (req) => deleteTeam(req.db, req.userId, req.params.id));
}
