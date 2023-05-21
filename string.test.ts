import { camelize } from "./string.ts";
import { assertEquals } from "./test_deps.ts";

Deno.test("camelise", async (t) => {
  await t.step("kebab-case", () => {
    assertEquals(camelize("kebab-cased-string"), "kebabCasedString");
    assertEquals(
      camelize("inconsistent-kEBab-cased-stRIng"),
      "inconsistentKebabCasedString",
    );
  });

  await t.step("snake_case", () => {
    assertEquals(camelize("snake_cased_string"), "snakeCasedString");
    assertEquals(
      camelize("incOnsisteNt_snake_cased_string"),
      "inconsistentSnakeCasedString",
    );
  });

  await t.step("string with spaces", () => {
    assertEquals(camelize("string witH SpaceS"), "stringWithSpaces");
  });

  await t.step("mixed case", () => {
    assertEquals(
      camelize("string with spaces_and_snakes-with-kebabs"),
      "stringWithSpacesAndSnakesWithKebabs",
    );
  });

  await t.step("acronyms", () => {
    assertEquals(
      camelize("initialize_SDK_with_options"),
      "initializeSdkWithOptions",
    );
  });
});
