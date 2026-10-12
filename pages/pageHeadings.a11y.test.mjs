import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import {
  PAGE_CANONICAL_PATH,
  PAGE_H1,
  SITE_ORIGIN,
  canonicalHref,
} from "./pageHeadingsA11y.mjs";

const pagesDir = dirname(fileURLToPath(import.meta.url));
const rootDir = join(pagesDir, "..");

function readPage(name) {
  return readFileSync(join(pagesDir, name), "utf8");
}

function readComponent(...parts) {
  return readFileSync(join(rootDir, "components", ...parts), "utf8");
}

describe("page heading helpers", () => {
  it("defines one locked h1 string per public page", () => {
    assert.deepEqual(PAGE_H1, {
      home: "Hello I am Nikos.",
      about: "About Me",
      projects: "Projects",
      skills: "Skills",
      contact: "Get In Touch",
    });
  });

  it("builds PascalCase canonical hrefs for live routes", () => {
    assert.equal(canonicalHref(PAGE_CANONICAL_PATH.home), SITE_ORIGIN);
    assert.equal(
      canonicalHref(PAGE_CANONICAL_PATH.about),
      `${SITE_ORIGIN}/About`,
    );
    assert.equal(
      canonicalHref(PAGE_CANONICAL_PATH.projects),
      `${SITE_ORIGIN}/Projects`,
    );
    assert.equal(
      canonicalHref(PAGE_CANONICAL_PATH.skills),
      `${SITE_ORIGIN}/Skills`,
    );
    assert.equal(
      canonicalHref(PAGE_CANONICAL_PATH.contact),
      `${SITE_ORIGIN}/Contact`,
    );
    assert.doesNotMatch(
      Object.values(PAGE_CANONICAL_PATH).join(" "),
      /\/about|\/projects|\/skills|\/contact/,
    );
  });
});

describe("Header brand is not a page h1", () => {
  it("renders the brand as a Link without an h1", () => {
    const header = readComponent("Header.tsx");
    assert.match(header, /from ["']next\/link["']/);
    assert.match(header, /<Link\b/);
    assert.doesNotMatch(header, /<h1\b/);
  });
});

describe("Home page headings", () => {
  it("keeps the page h1 Hello I am Nikos. in HomeAnimations", () => {
    const home = readComponent("animations", "HomeAnimations.tsx");
    assert.match(home, /<motion\.h1\b/);
    assert.match(home, new RegExp(PAGE_H1.home.replace(/\./g, "\\.")));
    assert.match(home, /<motion\.h2\b/);
  });
});

describe("About page headings and expertise list", () => {
  it("has About Me as h1 and Expertise items as ul/li", () => {
    const about = readPage("About.tsx");
    assert.match(about, /<motion\.h1\b[\s\S]*?About Me/);
    assert.match(about, /<motion\.ul\b[^>]*className=["'][^"']*space-y-3/);
    assert.match(about, /<motion\.li\b/);
    assert.doesNotMatch(
      about,
      /Expertise[\s\S]*?<motion\.div className=["']space-y-3["']/,
    );
  });

  it("uses PascalCase About canonical and og:url", () => {
    const about = readPage("About.tsx");
    const href = canonicalHref(PAGE_CANONICAL_PATH.about);
    assert.match(about, new RegExp(href.replace(/\./g, "\\.")));
    assert.match(about, /rel=["']canonical["']/);
    assert.match(about, /property=["']og:url["']/);
    assert.doesNotMatch(about, /pountzas-portfolio\.vercel\.app\/about["']/);
  });
});

describe("Projects page heading and canonical", () => {
  it("exposes a Projects h1 (visible or sr-only)", () => {
    const projects = readPage("Projects.tsx");
    assert.match(
      projects,
      /<h1\b[^>]*\bsr-only\b[^>]*>\s*Projects\s*<\/h1>|<h1\b[^>]*>\s*Projects\s*<\/h1>/,
    );
  });

  it("uses PascalCase Projects canonical and og:url", () => {
    const projects = readPage("Projects.tsx");
    const href = canonicalHref(PAGE_CANONICAL_PATH.projects);
    assert.match(projects, new RegExp(href.replace(/\./g, "\\.")));
    assert.doesNotMatch(
      projects,
      /pountzas-portfolio\.vercel\.app\/projects["']/,
    );
  });
});

describe("Skills page heading and canonical", () => {
  it("exposes a Skills h1 (visible or sr-only)", () => {
    const skills = readPage("Skills.tsx");
    assert.match(
      skills,
      /<h1\b[^>]*\bsr-only\b[^>]*>\s*Skills\s*<\/h1>|<h1\b[^>]*>\s*Skills\s*<\/h1>/,
    );
  });

  it("uses PascalCase Skills canonical and og:url", () => {
    const skills = readPage("Skills.tsx");
    const href = canonicalHref(PAGE_CANONICAL_PATH.skills);
    assert.match(skills, new RegExp(href.replace(/\./g, "\\.")));
    assert.doesNotMatch(skills, /pountzas-portfolio\.vercel\.app\/skills["']/);
  });
});

describe("Contact page heading and canonical", () => {
  it("keeps Get In Touch as the page h1", () => {
    const contact = readPage("Contact.tsx");
    assert.match(contact, /<motion\.h1\b[\s\S]*?Get In Touch/);
  });

  it("uses PascalCase Contact canonical and og:url", () => {
    const contact = readPage("Contact.tsx");
    const href = canonicalHref(PAGE_CANONICAL_PATH.contact);
    assert.match(contact, new RegExp(href.replace(/\./g, "\\.")));
    assert.doesNotMatch(contact, /pountzas-portfolio\.vercel\.app\/contact["']/);
  });
});
