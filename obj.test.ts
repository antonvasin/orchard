import { camelizeKeys } from "./obj.ts";
import { assert } from "./test_deps.ts";

Deno.test("camelizeKeys", () => {
  const obj = {
    user_obj: {
      name: "Andrew",
      roles: ["editor", "manager"],
      created_at: "2023-05-22T19:30:29",
    },
    meta_data: {
      is_new: false,
      accepted_tos: true,
    },
  };

  // deno-lint-ignore no-explicit-any
  const res: any = camelizeKeys(obj);
  assert(res.userObj);
  assert(res.userObj.createdAt);
  assert(!res["user_obj"]);
});
