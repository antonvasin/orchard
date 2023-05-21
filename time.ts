/** Returns difference in seconds between two ISO strings */
export function getSecondsDiff(start: string, end: string) {
  return Math.floor(
    (Date.parse(end) - Date.parse(start)) / 1000,
  );
}
