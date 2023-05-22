import flat from "npm:flat";
import { flattie } from "npm:flattie";
import { flatten } from "./obj.ts";

const objToFlat = {
  foo: "bar",
  baz: {
    nested: "value",
    deeper: {
      nested: "value",
    },
  },
};

Deno.bench("flat", { group: "obj.flatten" }, () => {
  flat(objToFlat);
});

Deno.bench("flattie", { group: "obj.flatten" }, () => {
  flattie(objToFlat);
});

Deno.bench("flatten", { group: "obj.flatten" }, () => {
  flatten(objToFlat);
});
