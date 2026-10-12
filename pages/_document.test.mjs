import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const documentPath = join(dirname(fileURLToPath(import.meta.url)), "_document.tsx");

test("Document sets lang=en on the Html element", () => {
  let source;

  try {
    source = readFileSync(documentPath, "utf8");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    assert.fail(`pages/_document.tsx must exist: ${message}`);
  }

  assert.match(
    source,
    /<Html\s+lang="en"/,
    'pages/_document.tsx must render <Html lang="en">',
  );
});
