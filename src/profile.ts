import { findUser } from "./users.js";

/** The heading of a user's profile page. */
export function profileHeading(id: string): string {
	const user = findUser(id)!;
	return `${user.name}'s profile`;
}
