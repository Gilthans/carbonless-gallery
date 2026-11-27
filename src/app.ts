import { createClient } from "./client";

export async function main(): Promise<void> {
	const client = createClient("https://api.example.test");
	console.log(await client.health());
}
