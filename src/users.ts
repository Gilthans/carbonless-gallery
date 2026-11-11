export interface User {
	id: string;
	name: string;
	email: string;
}

const users = new Map<string, User>([
	["u1", { id: "u1", name: "Ada Lovelace", email: "ada@example.com" }],
	["u2", { id: "u2", name: "Alan Turing", email: "alan@example.com" }],
]);

/** The user with this id, or undefined when there is none. */
export function findUser(id: string): User | undefined {
	return users.get(id);
}
