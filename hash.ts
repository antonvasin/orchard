/** Creates djb2 hash string */
export function djb2(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/** Bucketing for A/B testing (count=2), percentage rollout (count=100), etc */
export function assignToBucket(key: string, count: number, hashFn = djb2) {
  return hashFn(key) & count;
}
