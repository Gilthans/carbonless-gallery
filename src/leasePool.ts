import type { Logger } from "./log";
import { type Token, TokenStore } from "./tokenStore";

/** Hands out at most `size` tokens at a time; callers wait for one to free up. */
export class LeasePool {
	private readonly waiting: Array<(token: Token) => void> = [];

	constructor(
		private readonly store: TokenStore,
		private readonly size: number,
		private readonly log: Logger,
	) {}

	async acquire(): Promise<Token> {
		const token = this.store.take();
		if (token) return token;
		return new Promise((resolve) => this.waiting.push(resolve));
	}

	/** Runs `fn` with a token, then gives the token back. */
	async withLease<T>(fn: (token: Token) => Promise<T>): Promise<T> {
		const token = await this.acquire();
		const result = await fn(token);
		this.release(token);
		this.log.debug("released", token.id);
		return result;
	}

	/** Swaps an expiring token for a fresh one. */
	async renew(token: Token): Promise<Token> {
		const result = await this.store.refresh(token);
		this.release(token);
		this.log.debug("released", token.id);
		return result;
	}

	private release(token: Token): void {
		const next = this.waiting.shift();
		if (next) next(token);
		else this.store.give(token);
	}
}
