import { build, emptyDir } from "https://deno.land/x/dnt@0.35.0/mod.ts";

const outDir = "./_npm_build";

await emptyDir(outDir);

await build({
  entryPoints: ["./mod.ts"],
  test: false,
  outDir,
  shims: {},
  package: {
    // package.json properties
    name: "ts-utils",
    version: Deno.args[0],
    description: "Small everyday TypeScript utils with no dependencies",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/antonvasin/ts-utils.git",
    },
    bugs: {
      url: "https://github.com/antonvasin/ts-utils/issues",
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", `${outDir}/LICENSE`);
    Deno.copyFileSync("README.md", `${outDir}/README.md`);
  },
});
