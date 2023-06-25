import { parse } from "https://deno.land/std@0.117.0/flags/mod.ts";
import { build, emptyDir } from "https://deno.land/x/dnt@0.35.0/mod.ts";

const { version, outDir, modules } = parse(Deno.args, {
  string: ["version", "modules", "outDir"],
  default: {
    version: "0.1.0-alpha.1",
    outDir: "./_npm_build",
  },
});

const isCustomModules = !!modules;

if (isCustomModules) {
  let mod = "";

  for (const m of modules.split(",")) {
    mod += `export * as ${m} from "./${m}.ts";\n`;
  }

  const encoder = new TextEncoder();
  Deno.writeFileSync("./_custom_mod.ts", encoder.encode(mod));
}

await emptyDir(outDir);

await build({
  entryPoints: isCustomModules ? ["./_custom_mod.ts"] : ["./mod.ts"],
  test: false,
  outDir,
  shims: {
    timers: true,
    deno: true,
    undici: true,
  },
  package: {
    // package.json properties
    name: "ts-utils",
    version: version,
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

isCustomModules && Deno.removeSync("./_custom_mod.ts");
