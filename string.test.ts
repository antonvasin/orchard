import { camelize, toSlug } from "./string.ts";
import { assertEquals } from "./test_deps.ts";

Deno.test("camelise", async (t) => {
  await t.step("kebab-case", () => {
    assertEquals(camelize("kebab-cased-string"), "kebabCasedString");
    assertEquals(
      camelize("screaming-kebab-cased-string"),
      "screamingKebabCasedString",
    );
  });

  await t.step("snake_case", () => {
    assertEquals(camelize("snake_cased_string"), "snakeCasedString");
    assertEquals(
      camelize("SCREAMING_SNAKE_CASED_STRING"),
      "screamingSnakeCasedString",
    );
  });

  await t.step("string with spaces", () => {
    assertEquals(camelize("string with Spaces"), "stringWithSpaces");
    assertEquals(camelize("CAPS LOCK STRING"), "capsLockString");
  });

  await t.step("mixed case", () => {
    assertEquals(
      camelize("string WITH spaces_and_snakes-with-kebabs"),
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

Deno.test("toSlug", async (t) => {
  await t.step("string with spaces", () => {
    assertEquals(
      toSlug("Chapter 1: Hello World (again)"),
      "chapter-1-hello-world-again",
    );
  });
});
