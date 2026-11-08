import { createServer } from "node:http";
import { config } from "./config";

export function start() {
  const server = createServer((req, res) => {
    res.setHeader("x-powered-by", "notify/2");
    res.end("ok");
  });
  server.listen(config.port, config.host);
  return server;
}

export function stop(server: ReturnType<typeof start>) {
  server.close();
}
