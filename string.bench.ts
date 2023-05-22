import { camelize } from "./string.ts";
import lodashCamel from "npm:lodash.camelcase";
import camelizeTs from "npm:camelize-ts";

/*
 * camelize: here we're comparing several solutions that can work with simple strings.
 */
const camelRegex = (str: string) =>
  str.replace(
    /(?:^\w|[A-Z]|\b\w)/g,
    (ltr, idx) => idx === 0 ? ltr.toLowerCase() : ltr.toUpperCase(),
  ).replace(/\s+/g, "");
const stringToCamel = "kebab-cased-string";

Deno.bench("regex", { group: "string.camelize" }, () => {
  camelRegex(stringToCamel);
});

Deno.bench("lodash", { group: "string.camelize" }, () => {
  lodashCamel(stringToCamel);
});

Deno.bench("camelize-ts", { group: "string.camelize" }, () => {
  camelizeTs(stringToCamel);
});

Deno.bench("camelize", { group: "string.camelize" }, () => {
  camelize(stringToCamel);
});
