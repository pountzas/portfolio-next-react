import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import {
  MAIN_CONTENT_ID,
  SKIP_LINK_HREF,
  pageTransitionDuration,
  showFooter,
} from "./layoutA11y.mjs";

const layoutSource = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), "Layout.tsx"),
  "utf8",
);

describe("Layout a11y helpers", () => {
  it("hides the footer on the home pathname", () => {
    assert.equal(showFooter("/"), false);
  });

  it("shows the footer on non-home pathnames", () => {
    assert.equal(showFooter("/Projects"), true);
    assert.equal(showFooter("/About"), true);
  });

  it("sets page transition duration to 0 when reduced motion is preferred", () => {
    assert.equal(pageTransitionDuration(true), 0);
  });

  it("keeps a non-zero page transition duration when reduced motion is off", () => {
    assert.equal(pageTransitionDuration(false), 0.3);
  });
});

describe("Layout a11y source contracts", () => {
  it("renders a skip link as the first focusable child targeting #main-content", () => {
    assert.equal(SKIP_LINK_HREF, `#${MAIN_CONTENT_ID}`);
    assert.match(
      layoutSource,
      /href=\{SKIP_LINK_HREF\}|href="#main-content"/,
    );

    const afterReturn = layoutSource.slice(layoutSource.indexOf("return"));
    const skipIdx = afterReturn.search(
      /<a[\s\S]*?href=\{SKIP_LINK_HREF\}|<a[\s\S]*?href="#main-content"/,
    );
    const headerIdx = afterReturn.search(/<Header\s*\/>/);
    const mainIdx = afterReturn.search(/<motion\.main/);

    assert.ok(skipIdx !== -1, "expected a skip link in the layout JSX");
    assert.ok(headerIdx !== -1, "expected Header in the layout JSX");
    assert.ok(mainIdx !== -1, "expected motion.main in the layout JSX");
    assert.ok(
      skipIdx < headerIdx && skipIdx < mainIdx,
      "skip link must appear before Header and main",
    );
    assert.match(
      layoutSource,
      /id=\{MAIN_CONTENT_ID\}|id="main-content"/,
    );
    assert.match(layoutSource, /tabIndex=\{-1\}/);
  });

  it("uses min-h-screen without h-screen overflow-y-clip on the root wrapper", () => {
    const rootMatch = layoutSource.match(
      /className="([^"]*\bbg-tertiary\b[^"]*)"/,
    );
    assert.ok(rootMatch, "expected the tertiary root wrapper");
    const classes = rootMatch[1].split(/\s+/);

    assert.ok(classes.includes("min-h-screen"));
    assert.ok(!classes.includes("h-screen"));
    assert.ok(!classes.includes("overflow-y-clip"));
    assert.doesNotMatch(layoutSource, /\boverflow-y-clip\b/);
  });

  it("wires showFooter and pageTransitionDuration helpers", () => {
    assert.match(layoutSource, /showFooter\(/);
    assert.match(layoutSource, /pageTransitionDuration\(/);
  });
});
