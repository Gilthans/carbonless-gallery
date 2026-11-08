export class Poller {
  private timer: ReturnType<typeof setInterval> | undefined;

  start(every: number, tick: () => void): void {
    this.timer = setInterval(tick, every);
  }

  stop(): void {
    clearInterval(this.timer);
  }
}
