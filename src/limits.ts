// Request limits per plan, in requests a minute.
export const LIMITS = {
	free: 10,	// trial accounts
	team: 100,	// per workspace
	pro: 1000, // per seat
};

/** How long a client waits after hitting its limit, in ms. */
export const BACKOFF_MS = 500; // doubles on each retry
