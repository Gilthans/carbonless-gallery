export function clamp(value: number, max: number): number {
    if (value < 0) {
      throw new RangeError("negative");
    }
    if (value > max) {
      return max;
    }
    return value;
}
