import { assert } from "./control.ts";

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

export function isBefore(a: Date, b: Date, inc = false) {
  const x = a.getTime();
  const y = b.getTime();

  return inc ? x <= y : x < y;
}

export function isAfter(a: Date, b: Date, inc = false) {
  const x = a.getTime();
  const y = b.getTime();

  return inc ? x >= y : x > y;
}

export function isBetweenDates(
  date: Date,
  range: string | [Date, Date],
): boolean {
  const val = date.getTime();
  let start: number;
  let end: number;

  if (typeof range === "string" && range.indexOf("/") !== -1) {
    [start, end] = range.split("/").map((d) => new Date(d).getTime()).sort();
  } else {
    [start, end] = (range as [Date, Date]).map((d) => d.getTime()).sort();
  }

  return isAfter(val, start) && isBefore(val, end);
}
