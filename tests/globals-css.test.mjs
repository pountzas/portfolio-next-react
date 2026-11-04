import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";

const globalsPath = join(process.cwd(), "styles", "globals.css");
const css = readFileSync(globalsPath, "utf8");

describe("styles/globals.css WCAG Task 2", () => {
  it("sets scroll-padding-top on html for sticky header offset", () => {
    assert.match(
      css,
      /html\s*\{[^}]*scroll-padding-top\s*:\s*4\.5rem\s*;[^}]*\}/s,
      "expected html { scroll-padding-top: 4.5rem; }",
    );
  });

  it("defines a global :focus-visible ring without killing all focus outlines", () => {
    assert.match(
      css,
      /:focus-visible\s*\{[^}]*outline\s*:\s*2px\s+solid\s+#ffffff\s*;[^}]*outline-offset\s*:\s*2px\s*;[^}]*\}/is,
      "expected :focus-visible with 2px solid #ffffff and 2px offset",
    );
    assert.doesNotMatch(
      css,
      /\*\s*:\s*focus\s*\{[^}]*outline\s*:\s*none\s*;[^}]*\}/is,
      "must not use *:focus { outline: none; }",
    );
  });

  it("honors prefers-reduced-motion for focus and animations", () => {
    assert.match(
      css,
      /@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)\s*\{[\s\S]*html:focus-visible[\s\S]*\*:focus-visible[\s\S]*outline-width\s*:\s*3px\s*;[\s\S]*animation-duration\s*:\s*0\.01ms\s*!important\s*;[\s\S]*\}/is,
      "expected reduced-motion block with thicker focus ring and 0.01ms animations",
    );
  });

  it("keeps existing Tailwind layers", () => {
    assert.match(css, /@tailwind\s+base;/);
    assert.match(css, /@tailwind\s+components;/);
    assert.match(css, /@tailwind\s+utilities;/);
  });
});
