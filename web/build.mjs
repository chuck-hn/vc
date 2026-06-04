// Bundles the modular source into a single self-contained web/standalone.html
// that opens directly in a browser (file://) — no server, no dependencies.
// The ES modules under src/ remain the source of truth; this just inlines them.
//
//   node web/build.mjs
//
import { readFileSync, writeFileSync } from "node:fs";

const here = (p) => new URL(p, import.meta.url);

// Concatenation order = dependency order (no hoisting surprises).
const SRC = [
  "src/engine/format.js",
  "src/engine/captable.js",
  "src/engine/fate.js",
  "src/engine/scenarios.js",
  "src/game/run.js",
  "src/ui/app.js",
];

// Strip ES module syntax: drop `import ... from "...";` lines, remove leading
// `export ` so everything lives in one classic-script scope.
const strip = (code) =>
  code
    .split("\n")
    .filter((l) => !/^\s*import\s.+from\s.+;?\s*$/.test(l))
    .join("\n")
    .replace(/^export\s+/gm, "");

const js = SRC.map(
  (f) => `\n// ───────── ${f} ─────────\n` + strip(readFileSync(here(f), "utf8")),
).join("\n");

const css = readFileSync(here("styles.css"), "utf8");
const html = readFileSync(here("index.html"), "utf8")
  .replace(
    '<link rel="stylesheet" href="styles.css" />',
    `<style>\n${css}\n</style>`,
  )
  .replace(
    '<script type="module" src="src/ui/app.js"></script>',
    `<script>\n${js}\n</script>`,
  );

writeFileSync(here("standalone.html"), html);
console.log("Wrote web/standalone.html (" + (html.length / 1024).toFixed(1) + " KB)");
