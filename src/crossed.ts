export function setup(): void {
    loadConfig();
    connectDb();
    startServer();
  init();
}
