import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import {
  AXE_FLAGGED_REACT_ICON_NAMES,
  SKILL_CLOSE_BUTTON_CLASS_NAME,
  skillFireGradientId,
  skillProficiencyLabel,
  skillTitleId,
} from "./skillTemplateA11y.mjs";

const componentsDir = dirname(fileURLToPath(import.meta.url));
const rootDir = join(componentsDir, "..");

function read(relPath) {
  return readFileSync(join(rootDir, relPath), "utf8");
}

describe("skill a11y helpers", () => {
  it("namespaces fire gradient and dialog title ids per skill", () => {
    assert.equal(skillFireGradientId("rust"), "fireGradient-rust");
    assert.equal(skillTitleId("rust"), "skill-title-rust");
  });

  it("formats proficiency as visible text", () => {
    assert.equal(skillProficiencyLabel(80), "Proficiency 80%");
    assert.equal(skillProficiencyLabel(65), "Proficiency 65%");
  });

  it("keeps close control at least 44px", () => {
    assert.match(SKILL_CLOSE_BUTTON_CLASS_NAME, /min-h-11/);
    assert.match(SKILL_CLOSE_BUTTON_CLASS_NAME, /min-w-11/);
  });
});

describe("Skills page document scroll", () => {
  it("drops inner viewport scroller and uses pb-16 document flow", () => {
    const skills = read("pages/Skills.tsx");
    assert.doesNotMatch(skills, /h-\[calc\(100vh-3px\)\]/);
    assert.doesNotMatch(skills, /overflow-y-auto/);
    assert.match(skills, /pb-16/);
    assert.match(
      skills,
      /<h1\b[^>]*\bsr-only\b[^>]*>\s*Skills\s*<\/h1>|<h1\b[^>]*>\s*Skills\s*<\/h1>/,
    );
  });
});

describe("ModalWrapper dialog tree", () => {
  it("exposes one role=dialog with aria-modal and aria-labelledby", () => {
    const source = read("components/ModalWrapper.tsx");
    assert.match(source, /role=["']dialog["']/);
    assert.match(source, /aria-modal=["']true["']|aria-modal=\{true\}/);
    assert.match(source, /aria-labelledby=\{/);
    assert.doesNotMatch(source, /React\.FC/);
    assert.doesNotMatch(source, /forwardRef/);
  });
});

describe("SkillTemplate click-dialog contracts", () => {
  it("opens from a named button with visible skill name and dialog attrs", () => {
    const source = read("components/SkillTemplate.tsx");
    assert.match(source, /type=["']button["']/);
    assert.match(source, /aria-haspopup=["']dialog["']/);
    assert.match(source, /aria-expanded=\{showModal\}/);
    assert.match(source, /aria-label=\{skillName\}/);
    assert.match(source, /<span[^>]*>\{skillName\}<\/span>/);
    assert.doesNotMatch(source, /opacity-0/);
    assert.match(source, /useReducedMotion/);
    assert.match(source, /skillFireGradientId|fireGradient-\$\{/);
    assert.match(source, /skillProficiencyLabel|Proficiency/);
    assert.match(source, /aria-label=["']Close["']/);
    assert.match(source, /SKILL_CLOSE_BUTTON_CLASS_NAME|min-h-11 min-w-11/);
    assert.match(source, /from ["'].*skillTemplateA11y\.mjs["']/);
  });

  it("marks decorative fire and Official Site SVGs aria-hidden", () => {
    const source = read("components/SkillTemplate.tsx");
    assert.match(source, /aria-hidden/);
    // Official Site external-link SVG must be decorative
    assert.match(
      source,
      /Official Site[\s\S]*?<svg[^>]*aria-hidden/,
    );
  });

  it("does not open the dialog solely via hover completion", () => {
    const source = read("components/SkillTemplate.tsx");
    assert.doesNotMatch(
      source,
      /fireCompleted && isHovered[\s\S]*setShowModal\(true\)/,
    );
    assert.match(source, /onClick=\{[^}]*\}|onClick=\{handleOpen/);
  });
});

describe("lib/skills react-icons are decorative", () => {
  it("sets aria-hidden on every react-icons usage including Axe-flagged seven", () => {
    const source = read("lib/skills.tsx");
    for (const name of AXE_FLAGGED_REACT_ICON_NAMES) {
      assert.match(
        source,
        new RegExp(`<${name}\\b[^>]*aria-hidden`),
        `${name} must include aria-hidden`,
      );
    }

    const reactIconTags = [
      "TbBrandReactNative",
      "TbBrandVercel",
      "DiBootstrap",
      "DiPostgresql",
      "SiCinema4D",
      "SiElectron",
      "SiGraphql",
      "SiHeroku",
      "SiNetlify",
      "SiRust",
      "SiTauri",
      "GrDocker",
      "AiFillGithub",
    ];
    for (const name of reactIconTags) {
      const usages = source.match(new RegExp(`<${name}\\b[^/]*/>`, "g")) ?? [];
      assert.ok(usages.length >= 1, `expected at least one <${name} />`);
      for (const usage of usages) {
        assert.match(
          usage,
          /aria-hidden/,
          `${name} usage missing aria-hidden: ${usage}`,
        );
      }
    }
  });
});
