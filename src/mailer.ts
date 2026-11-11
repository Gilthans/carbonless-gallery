import { requireUser } from "./users.js";

export interface Mail {
	to: string;
	subject: string;
	body: string;
}

/** The welcome mail for a new user. */
export function welcomeMail(id: string): Mail {
	const user = requireUser(id);
	return {
		to: user.email,
		subject: "Welcome!",
		body: `Hi ${user.name}, welcome aboard.`,
	};
}
