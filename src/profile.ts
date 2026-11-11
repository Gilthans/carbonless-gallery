import { requireUser } from "./users.js";

/** The heading of a user's profile page. */
export function profileHeading(id: string): string {
	const user = requireUser(id);
	return `${user.name}'s profile`;
}
