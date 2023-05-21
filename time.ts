/** Returns difference in seconds between two ISO dates */
export function getSecondsDiff(
  start: string | number | Date,
  end: string | number | Date,
) {
  const startParsed = typeof start === "string"
    ? Date.parse(start)
    : typeof start === "number"
    ? start
    : start.getTime();
  const endParsed = typeof end === "string"
    ? Date.parse(end)
    : typeof end === "number"
    ? end
    : end.getTime();

  return Math.floor(
    (endParsed - startParsed) / 1000,
  );
}
