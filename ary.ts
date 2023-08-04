export function sampleAry<T>(ary: T[]): T {
  return ary[Math.floor(Math.random() * ary.length)];
}
