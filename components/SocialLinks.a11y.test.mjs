import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import {
  FOOTER_SITE_LINKS,
  socialProfileAriaLabel,
} from "./socialLinksA11y.mjs";

const componentsDir = dirname(fileURLToPath(import.meta.url));
const footerSource = readFileSync(join(componentsDir, "Footer.tsx"), "utf8");
const homeSource = readFileSync(
  join(componentsDir, "animations", "HomeAnimations.tsx"),
  "utf8",
);

describe("socialProfileAriaLabel", () => {
  it("matches Home's Visit my {name} profile pattern", () => {
    assert.equal(
      socialProfileAriaLabel("Github"),
      "Visit my Github profile",
    );
    assert.equal(
      socialProfileAriaLabel("LinkedIn"),
      "Visit my LinkedIn profile",
    );
  });
});

describe("FOOTER_SITE_LINKS", () => {
  it("lists Home About Projects Skills Contact with PascalCase routes", () => {
    assert.deepEqual(FOOTER_SITE_LINKS, [
      { label: "Home", href: "/" },
      { label: "About", href: "/About" },
      { label: "Projects", href: "/Projects" },
      { label: "Skills", href: "/Skills" },
      { label: "Contact", href: "/Contact" },
    ]);
  });
});

describe("SocialLinks source contracts", () => {
  it("exposes named external social Links with 44px targets and hidden icons", () => {
    const socialPath = join(componentsDir, "SocialLinks.tsx");
    assert.equal(existsSync(socialPath), true, "expected SocialLinks.tsx");
    const source = readFileSync(socialPath, "utf8");

    assert.match(source, /from ["']next\/link["']/);
    assert.match(source, /socialProfileAriaLabel/);
    assert.match(source, /SOCIAL_LINK_CLASS_NAME|min-h-11 min-w-11/);
    assert.match(source, /target=["']_blank["']/);
    assert.match(source, /rel=["']noopener noreferrer["']/);
    assert.match(source, /aria-hidden/);
    assert.doesNotMatch(source, /passHref/);
  });
});

describe("Footer source contracts", () => {
  it("uses an in-flow footer landmark with sitemap and SocialLinks", () => {
    assert.match(footerSource, /<footer\b/);
    assert.match(footerSource, /FOOTER_SITE_LINKS/);
    assert.match(footerSource, /<SocialLinks\b|<\/SocialLinks>|<SocialLinks\s*\/>/);
    assert.doesNotMatch(footerSource, /\bfixed\b/);
    assert.doesNotMatch(footerSource, /bottom-0/);
    assert.match(footerSource, /Copyright/);
  });
});

describe("HomeAnimations source contracts", () => {
  it("reuses SocialLinks in the body without a duplicate social map", () => {
    assert.match(homeSource, /from ["']\.\.\/SocialLinks["']/);
    assert.match(homeSource, /<SocialLinks\b|<\/SocialLinks>|<SocialLinks\s*\/>/);
    assert.doesNotMatch(homeSource, /Socials\.map/);
  });
});
