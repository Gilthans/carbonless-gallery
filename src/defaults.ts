/** Client defaults; every field can be overridden per call. */
export const DEFAULTS = { retries: 3, timeout: 1000, verbose: false };

export type Options = Partial<typeof DEFAULTS>;
