import flat from "npm:flat";
import { flattie } from "npm:flattie";
import { camelizeKeys, flatten } from "./obj.ts";
// import camelizeTs from "npm:camelize-ts";
import humps from "npm:humps";

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

Deno.bench("* flatten", { group: "obj.flatten" }, () => {
  flatten(objToFlat);
});

const obj = {
  user_obj: {
    name: "Andrew",
    created_at: "2023-05-22T19:30:29",
  },
  meta_data: {
    is_new: false,
    accepted_tos: true,
    arr: [1, 2, 3, 4, 5],
    meta_meta_data: {
      foo: "bar",
    },
  },
};

Deno.bench("* camelizeKeys", { group: "obj.camelizeKeys" }, () => {
  camelizeKeys(obj);
});

Deno.bench("humps", { group: "obj.camelizeKeys" }, () => {
  humps.camelizeKeys(obj);
});
