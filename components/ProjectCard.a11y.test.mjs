import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import {
  CLOSE_DIALOG_ARIA_LABEL,
  CLOSE_OVERLAY_ARIA_LABEL,
  GITHUB_LINK_ARIA_LABEL,
  LIVE_DEMO_LINK_ARIA_LABEL,
  TOUCH_TARGET_CLASS_NAME,
  getFocusableElements,
  handleProjectDialogKeyDown,
  nextFocusTarget,
  openDetailsAriaLabel,
} from "./projectCardA11y.mjs";

const componentsDir = dirname(fileURLToPath(import.meta.url));
const projectCardSource = readFileSync(
  join(componentsDir, "ProjectCard.tsx"),
  "utf8",
);
const projectModalSource = readFileSync(
  join(componentsDir, "ProjectModal.tsx"),
  "utf8",
);
const projectsPageSource = readFileSync(
  join(componentsDir, "..", "pages", "Projects.tsx"),
  "utf8",
);
const categorySwitcherSource = readFileSync(
  join(componentsDir, "ProjectCategorySwitcher.tsx"),
  "utf8",
);

describe("project card a11y helpers", () => {
  it("builds Open details for {name} labels", () => {
    assert.equal(openDetailsAriaLabel("portfolio"), "Open details for portfolio");
  });

  it("locks GitHub and Live demo new-tab link names", () => {
    assert.equal(GITHUB_LINK_ARIA_LABEL, "GitHub (opens in a new tab)");
    assert.equal(
      LIVE_DEMO_LINK_ARIA_LABEL,
      "Live demo (opens in a new tab)",
    );
  });

  it("locks Close and overlay dismiss names plus 44px target class", () => {
    assert.equal(CLOSE_DIALOG_ARIA_LABEL, "Close");
    assert.equal(CLOSE_OVERLAY_ARIA_LABEL, "Close dialog overlay");
    assert.equal(TOUCH_TARGET_CLASS_NAME, "min-h-11 min-w-11");
  });

  it("cycles Tab focus to the other edge of the dialog", () => {
    const first = { id: "first", focus() {} };
    const last = { id: "last", focus() {} };
    assert.equal(nextFocusTarget([first, last], last, false), first);
    assert.equal(nextFocusTarget([first, last], first, true), last);
    assert.equal(nextFocusTarget([first, last], first, false), null);
  });

  it("closes on Escape via handleProjectDialogKeyDown", () => {
    let closed = false;
    const prevented = [];
    const handled = handleProjectDialogKeyDown(
      {
        key: "Escape",
        preventDefault() {
          prevented.push(true);
        },
      },
      {
        container: null,
        onClose() {
          closed = true;
        },
      },
    );
    assert.equal(handled, true);
    assert.equal(closed, true);
    assert.equal(prevented.length, 1);
  });

  it("returns empty focusable list for missing containers", () => {
    assert.deepEqual(getFocusableElements(null), []);
    assert.deepEqual(getFocusableElements(undefined), []);
  });
});

describe("ProjectCard source contracts", () => {
  it("collapsed article has no role=button and uses an open details button", () => {
    assert.match(projectCardSource, /openDetailsAriaLabel/);
    assert.match(
      projectCardSource,
      /type=["']button["'][\s\S]*absolute inset-0 z-0|absolute inset-0 z-0[\s\S]*type=["']button["']/,
    );
    assert.doesNotMatch(
      projectCardSource,
      /role=\{isSelected \? ["']dialog["'] : ["']button["']\}/,
    );
    assert.doesNotMatch(
      projectCardSource,
      /role=["']button["']/,
    );
  });

  it("expanded dialog uses role=dialog aria-modal and labelledby without button role", () => {
    assert.match(projectCardSource, /role=\{isSelected \? ["']dialog["'] : undefined\}|role=\{isSelected \? ["']dialog["'] : null\}|\{?\.\.\.\(isSelected[\s\S]*role:\s*["']dialog["']/);
    assert.match(projectCardSource, /aria-modal=\{isSelected/);
    assert.match(projectCardSource, /aria-labelledby=\{titleId\}/);
    assert.match(projectCardSource, /handleProjectDialogKeyDown|getFocusableElements|nextFocusTarget/);
    assert.match(
      projectCardSource,
      /aria-label=\{CLOSE_DIALOG_ARIA_LABEL\}|aria-label=["']Close["']/,
    );
    assert.match(
      projectCardSource,
      /TOUCH_TARGET_CLASS_NAME|min-h-11 min-w-11/,
    );
  });

  it("names ProjectLinks with new-tab aria-labels and 44px targets above the open layer", () => {
    assert.match(projectCardSource, /GITHUB_LINK_ARIA_LABEL|GitHub \(opens in a new tab\)/);
    assert.match(
      projectCardSource,
      /LIVE_DEMO_LINK_ARIA_LABEL|Live demo \(opens in a new tab\)/,
    );
    assert.match(projectCardSource, /relative z-10/);
    assert.match(
      projectCardSource,
      /TOUCH_TARGET_CLASS_NAME|min-h-11 min-w-11/,
    );
    assert.doesNotMatch(projectCardSource, /passHref/);
  });

  it("uses empty alt on project OG images and drops contributor hover overlay", () => {
    assert.match(projectCardSource, /alt=["']["']/);
    assert.doesNotMatch(
      projectCardSource,
      /alt=\{item\.name\}/,
    );
    assert.doesNotMatch(projectCardSource, /hover:opacity-100/);
    assert.doesNotMatch(
      projectCardSource,
      /opacity-0[\s\S]*\{user\.node\.name\}/,
    );
  });
});

describe("ProjectModal source contracts", () => {
  it("exposes a named overlay close button instead of aria-hidden click target", () => {
    assert.match(projectModalSource, /CLOSE_OVERLAY_ARIA_LABEL|Close dialog overlay/);
    assert.match(
      projectModalSource,
      /<(motion\.)?button\b|as=["']button["']/,
    );
    assert.doesNotMatch(
      projectModalSource,
      /onClick=\{onClose\}[\s\S]*aria-hidden|aria-hidden[\s\S]*onClick=\{onClose\}/,
    );
  });
});

describe("Projects page source contracts", () => {
  it("keeps sr-only Projects h1 and polite loading status", () => {
    assert.match(
      projectsPageSource,
      /<h1\b[^>]*\bsr-only\b[^>]*>\s*Projects\s*<\/h1>/,
    );
    assert.match(projectsPageSource, /role=["']status["']/);
    assert.match(projectsPageSource, /aria-live=["']polite["']/);
  });

  it("prefers document scroll over a full-viewport section scroller", () => {
    assert.doesNotMatch(
      projectsPageSource,
      /overflow-y-auto h-screen|h-screen[^"']*overflow-y-auto/,
    );
  });

  it("stabilizes ProjectCard onClose with useCallback so focus trap does not re-run", () => {
    assert.match(projectsPageSource, /\buseCallback\b/);
    assert.match(
      projectsPageSource,
      /const\s+\w+\s*=\s*useCallback\(\s*\(\)\s*=>\s*setSelectedProject\(null\)\s*,\s*\[\s*\]\s*\)/,
    );
    assert.doesNotMatch(
      projectsPageSource,
      /<ProjectCard[\s\S]*onClose=\{\(\)\s*=>\s*setSelectedProject\(null\)\}/,
    );
  });
});

describe("ProjectCategorySwitcher tab targets", () => {
  it("uses 44px tab targets with px-4 py-2 and gap-2", () => {
    assert.match(categorySwitcherSource, /gap-2/);
    assert.match(categorySwitcherSource, /min-h-11/);
    assert.match(categorySwitcherSource, /px-4 py-2/);
  });
});
