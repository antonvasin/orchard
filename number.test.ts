import { assert } from "./test_deps.ts";

import * as num from "./number.ts";

Deno.test("collideRect", () => {
  assert(num.collideRect(100, 100, 100, 100, 50, 50, 200, 200));
  assert(!num.collideRect(100, 100, 100, 100, 50, 50, 20, 20));
});
