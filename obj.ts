/** Flattens JS object into flat dot-notated one */
// deno-lint-ignore ban-types
export function flatten(obj: object, prefix?: string) {
  const propName = (prefix) ? prefix + "." : "";
  let ret: Record<string, unknown> = {};

  for (const attr in obj) {
    if (Array.isArray(obj[attr])) {
      ret[attr] = obj[attr].join(",");
    } else if (typeof obj[attr] === "object") {
      ret = { ...ret, ...flatten(obj[attr], propName + attr) };
    } else {
      ret[propName + attr] = obj[attr];
    }
  }
  return ret;
}
