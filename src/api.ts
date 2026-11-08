import { withRetry } from "./retry";

export async function getJson(url: string): Promise<unknown> {
  return withRetry(async () => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    return res.json();
  });
}
