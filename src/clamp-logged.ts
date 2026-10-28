import { log } from "./log";

export function clampLogged(value: number, max: number): number {
    if (value < 0) {
      throw new RangeError("negative");
    }
    if (value >= max) {
      log("clamped");
      return max;
    }
    return value;
}
