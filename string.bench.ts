import { camelize } from "./string.ts";
import lodashCamel from "npm:lodash.camelcase";
import camelizeTs from "npm:camelize-ts";
import humps from "npm:humps";

/*
 * camelize: here we're comparing several solutions that can work with simple strings.
 */
function camelizeRegex(str: string) {
  return str
    .replace(/[_-\s]+(.)?/g, (_, chr) => (chr ? chr.toUpperCase() : ""))
    .replace(/^(.)/, (_, chr) => chr.toLowerCase());
}

const stringToCamel = "kebab-cased-string";

Deno.bench("regex", { group: "string.camelize" }, () => {
  camelizeRegex(stringToCamel);
});

Deno.bench("lodash", { group: "string.camelize" }, () => {
  lodashCamel(stringToCamel);
});

Deno.bench("camelize-ts", { group: "string.camelize" }, () => {
  camelizeTs(stringToCamel);
});

Deno.bench("* camelize", { group: "string.camelize" }, () => {
  camelize(stringToCamel);
});

Deno.bench("humps", { group: "string.camelize" }, () => {
  humps.camelize(stringToCamel);
});
