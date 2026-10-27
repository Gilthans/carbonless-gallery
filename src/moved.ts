export function boot(): void {
  init();
  loadConfig();
  connectDb();
  startServer();
}
