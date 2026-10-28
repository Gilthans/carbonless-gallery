import type { ServiceCheck } from "./checks.js";

const LABEL = { up: "Operational", degraded: "Degraded", down: "Outage" } as const;

export function renderPage(checks: ServiceCheck[]): string {
	const rows = checks
		.map(
			(check) =>
				`<li class="${check.health}"><span>${check.name}</span><b>${LABEL[check.health]}</b><i>${check.latencyMs} ms</i></li>`,
		)
		.join("\n");
	return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>Status</title><link rel="icon" href="favicon.png"></head>
<body><img src="logo.png" alt=""><img class="hero" src="hero.png" alt=""><ul>${rows}</ul></body>
</html>`;
}
