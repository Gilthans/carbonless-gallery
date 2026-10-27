export function boot(): void {
    loadConfig();
    connectDb();
    startServer();
    init();
}
