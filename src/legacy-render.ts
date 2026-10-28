// Renders the v1 table layout. Kept while the old embed widget still
// points here; remove once nothing fetches /legacy.html.
import type { ServiceCheck } from "./checks.js";

export function renderLegacyTable(checks: ServiceCheck[]): string {
	const rows = checks.map(
		(check) => `<tr><td>${check.name}</td><td>${check.health}</td></tr>`,
	);
	return `<table><tr><th>Service</th><th>Status</th></tr>${rows.join("")}</table>`;
}
