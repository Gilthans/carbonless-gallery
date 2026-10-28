import type { Router } from "../../lib/router.js";
import { deleteReview, getReview, listReviews } from "./reviews.service.js";

export function registerReviewsRoutes(router: Router): void {
	router.get("/catalog/reviews", (req) => listReviews(req.db, req.userId));
	router.get("/catalog/reviews/:id", (req) => getReview(req.db, req.userId, req.params.id));
	router.delete("/catalog/reviews/:id", (req) => deleteReview(req.db, req.userId, req.params.id));
}
