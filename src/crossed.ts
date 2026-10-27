export function setup(): void {
  init();
  loadConfig();
  connectDb();
  startServer();
}
