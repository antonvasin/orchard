import { assert, assertEquals } from "./test_deps.ts";

import * as num from "./number.ts";
import { bin, range } from "./number.ts";

Deno.test("collideRect", () => {
  assert(num.collideRect(100, 100, 100, 100, 50, 50, 200, 200));
  assert(!num.collideRect(100, 100, 100, 100, 50, 50, 20, 20));
});

Deno.test("scale", () => {
  const linear = (n: number) => num.scale(10, 40, 100, 200, n);

  assertEquals(linear(1), 100);
  assertEquals(linear(10), 100);
  assertEquals(linear(31), 170);
  assertEquals(linear(40), 200);
  assertEquals(linear(60), 200);

  const doubleLinear = (n: number) =>
    num.scale(10, 40, 100, 200, n, (num) => num * 2);

  assertEquals(doubleLinear(1), 100);
  assertEquals(doubleLinear(10), 100);
  assertEquals(doubleLinear(31), 240);
  assertEquals(doubleLinear(40), 300);
  assertEquals(doubleLinear(60), 300);
});

Deno.test("bin", () => {
  const bins = ["owl", "cat", "otter", "dog"];
  const range = [0, 100];
  assertEquals(bin(10, range[0], range[1], bins), bins[0]);
  assertEquals(bin(70, range[0], range[1], bins), bins[2]);
});

Deno.test("range", () => {
  let i = 0;
  // for (const r of range(0, 3)) {
  //   i = r;
  // }
  // assertEquals(i, 2);

  i = 10;
  for (const r of range(3, 0)) {
    console.log(r);

    i = r;
  }
  assertEquals(i, 0);
});
