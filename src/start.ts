import { log } from "./log";

export function start(name: string): void {
  log(`starting ${name}`);
  const t = Date.now();
  run(name);
  log(`done in ${Date.now() - t}ms`);
}

function run(name: string): void {
  log(name);
}
