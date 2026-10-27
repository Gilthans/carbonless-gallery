export interface Job {
  id: string;
  failed: boolean;
  run(): void;
  retry(): void;
}

export function flush(queue: Job[], log: (s: string) => void): void {
  for (const job of queue) {
    log(`running ${job.id}`);
    job.run();
    if (job.failed) {
      log(`failed ${job.id}`);
      job.retry();
    }
    log(`done ${job.id}`);
  }
  queue.length = 0;
}
