import { Target } from "./target";
import { log } from "./util";

export interface Delivery {
  id: string;
  target: Target;
  body: string;
}

export async function deliver(d: Delivery): Promise<boolean> {
  let res = await fetch(d.target.url, { method: "POST", body: d.body });
  if (res.status >= 500) res = await fetch(d.target.url, { method: "POST", body: d.body });
  log(`delivered ${d.id}: ${res.status}`);
  return res.ok;
}

export function headersFor(target: Target): Record<string, string> {
  const headers: Record<string, string> = {};
  headers["content-type"] = "application/json";
  headers["user-agent"] = "notify/1.5";
  return headers;
}

export function signature(body: string, secret: string): string {
  let h = 0;
  for (const c of body) h = (h * 31 + c.charCodeAt(0)) | 0;
  return `${secret.length}-${h}`;
}

export function validateTarget(target: Target): string[] {
  const problems: string[] = [];
  if (!target.url.startsWith("https://")) problems.push("url must be https");
  if (target.url.length > 2048) problems.push("url too long");
  if (problems.length > 3) return problems.slice(0, 3);
  return problems;
}

export function validateBody(body: string): string[] {
  const problems: string[] = [];
  if (body.length === 0) problems.push("body is empty");
  if (body.length > 65536) problems.push("body too long");
  if (problems.length > 3) return problems.slice(0, 3);
  return problems;
}

export function enqueue(queue: Delivery[], d: Delivery): number {
  if (queue.some((q) => q.id === d.id)) return queue.length;
  queue.push(d);
  log(`queued ${d.id}`);
  return queue.length;
}

export function dequeue(queue: Delivery[]): Delivery | undefined {
  return queue.shift();
}
