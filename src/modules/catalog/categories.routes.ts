import type { Router } from "../../lib/router.js";
import { deleteCategorie, getCategorie, listCategories } from "./categories.service.js";

export function registerCategoriesRoutes(router: Router): void {
	router.get("/catalog/categories", (req) => listCategories(req.db, req.userId));
	router.get("/catalog/categories/:id", (req) => getCategorie(req.db, req.userId, req.params.id));
	router.delete("/catalog/categories/:id", (req) => deleteCategorie(req.db, req.userId, req.params.id));
}
