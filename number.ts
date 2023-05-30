export function random(min = 0, max = 1, bias = 0): number {
  if (bias < 0 || bias > 1) {
    throw new Error("Bias must be a value between 0 and 1.");
  }

  const value = Math.pow(Math.random(), 1 - bias) * (max - min) + min;

  return max > 1 ? Math.floor(value) : value;
}

export function clamp(num: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, num));
}

export function lerp(a: number, b: number, n: number) {
  return a * (1 - n) + b * n;
}

export function invlerp(a: number, b: number, n: number) {
  return clamp((n - a) / (b - a));
}

export function range(
  a1: number,
  b1: number,
  a2: number,
  b2: number,
  n: number,
) {
  return lerp(a2, b2, invlerp(a1, b1, n));
}

export function distance(x0: number, y0: number, x1: number, y1: number) {
  return Math.hypot(x1 - x0, y1 - y0);
}

export function collideRect(
  x1: number,
  y1: number,
  width1: number,
  height1: number,
  x2: number,
  y2: number,
  width2: number,
  height2: number,
): boolean;
