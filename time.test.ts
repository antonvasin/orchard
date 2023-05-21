import { assert, assertEquals } from "./test_deps.ts";
import { getSecondsDiff } from "./time.ts";

Deno.test("getSecondsDiff", () => {
  assertEquals(
    getSecondsDiff("2000-01-01T00:00:00", "2000-02-01T00:00:00"),
    60 * 60 * 24 * 31,
  );
});
