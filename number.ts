export function random(min = 0, max = 1, b = 0): number {
  const bias = clamp(0, 1, b);

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

export function scale(
  a1: number,
  b1: number,
  a2: number,
  b2: number,
  n: number,
  scaleFn: (n: number) => number = (n) => n,
) {
  return lerp(a2, b2, scaleFn(invlerp(a1, b1, n)));
}

export function distance(x0: number, y0: number, x1: number, y1: number) {
  return Math.hypot(x1 - x0, y1 - y0);
}

export function isBetween(n: number, a: number, b: number) {
  return (n > a && n < b) || (n > b && n < a);
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
): boolean {
  const intersectX = isBetween(x1, x2, x2 + width2) ||
    isBetween(x2, x1, x1 + width1);
  const intersectY = isBetween(y1, y2, y2 + height2) ||
    isBetween(y2, y1, y1 + height1);
  return intersectX && intersectY;
}

export function degToRad(deg: number) {
  return deg * (Math.PI / 180);
}

export function radToDeg(rad: number) {
  return rad * (180 / Math.PI);
}
