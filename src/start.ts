import { log } from "./log";

export function start(name: string): void {
  log(`starting ${name}`);
  log(`at ${new Date().toISOString()}`);
  const t = Date.now();
  run(name);
  log(`done in ${Date.now() - t}ms`);
}

function run(name: string): void {
  log(name.trim());
}
