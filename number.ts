export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function getRandomValue(bias = 0, max = 1): number {
  if (bias < 0 || bias > 1) {
    throw new Error("Bias must be a value between 0 and 1.");
  }

  const randomValue = Math.random();
  return Math.pow(randomValue, bias) * max;
}

export function clamp(num: number, min: number, max: number) {
  return Math.max(Math.min(num, Math.max(min, max)), Math.min(min, max));
}
