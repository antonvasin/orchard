import { assert, assertEquals } from "./test_deps.ts";

import * as num from "./number.ts";

Deno.test("collideRect", () => {
  assert(num.collideRect(100, 100, 100, 100, 50, 50, 200, 200));
  assert(!num.collideRect(100, 100, 100, 100, 50, 50, 20, 20));
});

Deno.test("scale", () => {
  const linear = (n: number) => num.scale(10, 40, 100, 200, n);

  assertEquals(linear(10), 100);
  assertEquals(linear(40), 200);
  assertEquals(linear(31), 170);
});
