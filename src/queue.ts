export interface Job {
  run(): void;
}

export function drain(queue: Job[], log: (s: string) => void): void {
    for (const job of queue) {
        job.run();
    }
  log("draining");
}
