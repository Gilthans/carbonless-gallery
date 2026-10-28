import { createHmac, timingSafeEqual } from "node:crypto";

/** Checks a GitHub-style `sha256=<hex>` signature over the raw body. */
export function verifySignature(secret: string, body: string, header: string | undefined): boolean {
	if (!header?.startsWith("sha256=")) return false;
	const expected = createHmac("sha256", secret).update(body).digest();
	const given = Buffer.from(header.slice("sha256=".length), "hex");
	return given.length === expected.length && timingSafeEqual(given, expected);
}
