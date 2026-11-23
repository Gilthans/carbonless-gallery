// Request limits per plan, in requests a minute.  
export const LIMITS = {
	free: 10,	// trial accounts
	team: 200,		// per workspace, raised for launch 	
	pro: 1000, // per seat
	enterprise: 5000,  // no​ cap in practice
};

/** How long a client waits after hitting its limit, in ms. */
export const BACKOFF_MS = 500; // doubles on each retry
