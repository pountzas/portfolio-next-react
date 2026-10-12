import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import {
  BRAND_HREF,
  BRAND_NAME,
  NAV_ITEMS,
  PRIMARY_NAV_ARIA_LABEL,
  ariaCurrentPage,
  isNavItemActive,
} from "./navA11y.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const navGroupSource = readFileSync(join(here, "NavGroup.tsx"), "utf8");
const navItemSource = readFileSync(join(here, "NavItem.tsx"), "utf8");
const headerSource = readFileSync(join(here, "Header.tsx"), "utf8");

describe("nav a11y helpers", () => {
  it("lists About between Home and Projects with PascalCase routes", () => {
    assert.deepEqual(
      NAV_ITEMS.map((item) => ({ label: item.label, path: item.path })),
      [
        { label: "Home", path: "/" },
        { label: "About", path: "/About" },
        { label: "Projects", path: "/Projects" },
        { label: "Skills", path: "/Skills" },
        { label: "Contact", path: "/Contact" },
      ],
    );
  });

  it("marks the matching pathname as the current page", () => {
    assert.equal(isNavItemActive("/About", "/About"), true);
    assert.equal(isNavItemActive("/Projects", "/About"), false);
    assert.equal(ariaCurrentPage(true), "page");
    assert.equal(ariaCurrentPage(false), undefined);
  });
});

describe("NavGroup source contracts", () => {
  it("exports About in the locked primary-nav order", () => {
    const labels = [...navGroupSource.matchAll(/label:\s*'([^']+)'/g)].map(
      (match) => match[1],
    );
    assert.deepEqual(labels, [
      "Home",
      "About",
      "Projects",
      "Skills",
      "Contact",
    ]);
    assert.match(navGroupSource, /path:\s*'\/About'/);
  });

  it("does not push routes with onClick or router.push", () => {
    assert.doesNotMatch(navGroupSource, /\bonClick\b/);
    assert.doesNotMatch(navGroupSource, /router\.push/);
  });

  it("wires active state through isNavItemActive", () => {
    assert.match(navGroupSource, /isNavItemActive\(/);
  });
});

describe("NavItem source contracts", () => {
  it("wraps a next/link Link with aria-current, aria-label, and 24px target", () => {
    assert.match(navItemSource, /from ['"]next\/link['"]/);
    assert.match(navItemSource, /<Link\b/);
    assert.match(navItemSource, /href=\{path\}/);
    assert.match(navItemSource, /aria-current=\{/);
    assert.match(navItemSource, /aria-label=\{label\}/);
    assert.match(navItemSource, /\bmin-h-6\b/);
    assert.match(navItemSource, /\bmin-w-6\b/);
  });

  it("does not use onClick navigation or React.FC", () => {
    assert.doesNotMatch(navItemSource, /\bonClick\b/);
    assert.doesNotMatch(navItemSource, /\bReact\.FC\b/);
  });

  it("hides the mobile icon from assistive tech", () => {
    assert.match(navItemSource, /aria-hidden/);
  });
});

describe("Header source contracts", () => {
  it("uses a sticky header landmark and Primary nav", () => {
    assert.match(headerSource, /<motion\.header\b|<header\b/);
    assert.match(headerSource, /sticky top-0 z-50/);
    assert.match(
      headerSource,
      new RegExp(
        `<nav[^>]*aria-label=["']${PRIMARY_NAV_ARIA_LABEL}["']|aria-label=\\{PRIMARY_NAV_ARIA_LABEL\\}`,
      ),
    );
  });

  it("renders the brand as a home Link, not an h1", () => {
    assert.doesNotMatch(headerSource, /<h1\b/);
    assert.match(headerSource, /from ['"]next\/link['"]/);
    assert.match(
      headerSource,
      new RegExp(`href=["']${BRAND_HREF}["']|href=\\{BRAND_HREF\\}`),
    );
    assert.match(
      headerSource,
      new RegExp(
        `aria-label=["']${BRAND_NAME}["']|aria-label=\\{BRAND_NAME\\}`,
      ),
    );
  });
});
