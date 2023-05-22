/** Flattens JS object into flat dot-notated one */
export function flatten(
  obj: Record<string, unknown>,
  prefix?: string,
  // TODO: investigate passing result as arg, to avoid creating result object every time
  // TODO: tests
): Record<string, unknown> {
  const propName = (prefix) ? prefix + "." : "";
  const result: Record<string, unknown> = {};

  for (const attr in obj) {
    const val = obj[attr];
    if (Array.isArray(val)) {
      result[attr] = val.join(",");
    } else if (typeof val === "object" && val !== null) {
      Object.assign(
        result,
        flatten(val as Record<string, unknown>, propName + attr),
      );
    } else {
      result[propName + attr] = val;
    }
  }

  return result;
}
