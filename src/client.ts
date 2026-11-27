import * as api from "../gen/api";
import { createTransport } from "../gen/transport";

export function createClient(base: string) {
	const t = createTransport(base);

	return {
		health: () => api.health(t),
		user: (id: string) => api.getUser(t, { id }),
	};
}
