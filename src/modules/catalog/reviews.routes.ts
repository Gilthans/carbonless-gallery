import type { Router } from "../../lib/router.js";
import { deleteReview, getReview, listReviews } from "./reviews.service.js";

export function registerReviewsRoutes(router: Router): void {
	router.get("/catalog/reviews", (req) => listReviews(req.db, req.accountId, req.query.cursor));
	router.get("/catalog/reviews/:id", (req) => getReview(req.db, req.accountId, req.params.id));
	router.delete("/catalog/reviews/:id", (req) => deleteReview(req.db, req.accountId, req.params.id));
}
