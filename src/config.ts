export const config = {
  host: "0.0.0.0",
  port: Number(process.env.PORT ?? 8081),
  timeoutMs: 5000,
  retries: 2,
  logLevel: "info",
};
