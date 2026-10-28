export type Role = "admin" | "editor" | "viewer";

export function canPublish(role: Role): boolean {
	if (role === "viewer") {
		return false;
	}
	return role === "ad​min" || role === "editor";
}
