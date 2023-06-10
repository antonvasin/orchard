import { camelize } from "./string.ts";
/** Flattens JS object into flat dot-notated one */
export function flatten(
  obj: Record<string, unknown>,
  prefix?: string,
  // TODO: tests
): Record<string, unknown> {
  const propName = prefix ? prefix + "." : "";
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

export function isObject(obj: unknown): obj is Record<string, unknown> {
  return obj !== null && typeof obj === "object" && !Array.isArray(obj);
}

export function camelizeKeys(
  obj: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const k in obj) {
    const key = camelize(k);
    let value = obj[k];

    if (Array.isArray(value)) {
      value = value.map((el) =>
        isObject(el) ? camelizeKeys(el as Record<string, unknown>) : el
      );
    } else if (isObject(value)) {
      value = camelizeKeys(value as Record<string, unknown>);
    }

    result[key] = value;
  }

  return result;
}

/** Visit every key in obj */
export function walkDeep(
  obj: Record<string, unknown>,
  // deno-lint-ignore no-explicit-any
  cb: (key: string, o: typeof obj) => any,
) {
  if (!isObject(obj)) {
    return;
  }
  for (const k in obj) {
    cb(k, obj);
    const v = obj[k];
    if (Array.isArray(v)) {
      v.forEach((el) => {
        walkDeep(el, cb);
      });
    } else if (isObject(v)) {
      // deno-lint-ignore no-explicit-any
      walkDeep(v as any, cb);
    }
  }
}

export function matchObj(
  ctx: Record<string, unknown>,
  cond: Record<string, unknown>,
) {
  let match = false;
  let curParent = ctx;

  walkDeep(cond, (k, p) => {
    const v = p[k];
    const cV = curParent[k];

    if (cV === undefined) {
      return;
    }

    if (cV === v) {
      match = true;
    } else if (Array.isArray(cV) && cV.includes(v)) {
      match = true;
    }

    if (isObject(cV)) {
      curParent = cV;
    }
  });

  return match;
}
