export interface AppConfig {
  env: "development" | "staging" | "production";
  region: string;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  const mode = env.APP_ENV ?? "development";
  if (mode !== "development" && mode !== "staging" && mode !== "production") {
    throw new Error(`Unknown APP_ENV: ${mode}`);
  }
  return { env: mode, region: env.APP_REGION ?? "eu-west-1" };
}
