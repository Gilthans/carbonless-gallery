import { runCheck } from "./checks.js";
import { renderPage } from "./render.js";

const SERVICES = [
	["API", "https://api.example.com/health"],
	["Dashboard", "https://app.example.com/health"],
	["Webhooks", "https://hooks.example.com/health"],
] as const;

const checks = await Promise.all(SERVICES.map(([name, url]) => runCheck(name, url)));
process.stdout.write(renderPage(checks));
