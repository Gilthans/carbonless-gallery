import { findUser } from "./users.js";

/** The line atop every page: the user's name when we know them. */
export function greeting(id: string): string {
	const user = findUser(id);
	return user ? `Hello, ${user.name}` : "Hello";
}
