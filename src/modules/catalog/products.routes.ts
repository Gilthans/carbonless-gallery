import type { Router } from "../../lib/router.js";
import { deleteProduct, getProduct, listProducts } from "./products.service.js";

export function registerProductsRoutes(router: Router): void {
	router.get("/catalog/products", (req) => listProducts(req.db, req.userId));
	router.get("/catalog/products/:id", (req) => getProduct(req.db, req.userId, req.params.id));
	router.delete("/catalog/products/:id", (req) => deleteProduct(req.db, req.userId, req.params.id));
}
