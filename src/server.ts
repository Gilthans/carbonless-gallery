import { createServer } from "node:http";
import { config } from "./config";

export function start() {
  const server = createServer((req, res) => {
    res.end("ok");
  });
  server.listen(config.port, config.host);
  server.setTimeout(config.timeoutMs);
  return server;
}

export function stop(server: ReturnType<typeof start>) {
  server.close();
}
