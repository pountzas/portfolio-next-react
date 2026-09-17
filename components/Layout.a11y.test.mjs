import assert from "node:assert/strict";
import { beforeEach, describe, it, mock } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

/** @type {{ pathname: string }} */
let routerState = { pathname: "/" };
let reducedMotion = false;
/** @type {{ duration?: number, ease?: string } | undefined} */
let lastMainTransition;

/**
 * @param {string} tag
 */
function passthrough(tag) {
  return ({ children, transition, ...rest }) => {
    if (tag === "main") {
      lastMainTransition = transition;
    }
    return createElement(tag, rest, children);
  };
}

mock.module("next/router", {
  namedExports: {
    useRouter: () => routerState,
  },
});

mock.module("next/head", {
  defaultExport: ({ children }) =>
    createElement("div", { "data-head": "true" }, children),
});

mock.module("./Header", {
  defaultExport: () =>
    createElement("header", { "data-header": "true" }, "Header"),
});

mock.module("./Footer", {
  defaultExport: () =>
    createElement("footer", { "data-footer": "true" }, "Site footer"),
});

mock.module("framer-motion", {
  namedExports: {
    useReducedMotion: () => reducedMotion,
    AnimatePresence: ({ children }) =>
      createElement("div", { "data-animate-presence": "true" }, children),
    motion: {
      main: passthrough("main"),
      div: passthrough("div"),
    },
  },
});

const { default: Layout } = await import("./Layout.tsx");

/**
 * @param {string} pathname
 * @param {boolean} [prefersReduced]
 */
function renderLayout(pathname, prefersReduced = false) {
  routerState = { pathname };
  reducedMotion = prefersReduced;
  lastMainTransition = undefined;
  return renderToStaticMarkup(
    createElement(Layout, null, createElement("p", null, "Page body")),
  );
}

/**
 * @param {string} html
 */
function firstFocusableSnippet(html) {
  const match = html.match(/<(a|button|input|select|textarea)\b[^>]*>/i);
  return match ? match[0] : null;
}

describe("Layout a11y", () => {
  beforeEach(() => {
    routerState = { pathname: "/" };
    reducedMotion = false;
    lastMainTransition = undefined;
  });

  it("renders a skip link as the first focusable child targeting #main-content", () => {
    const html = renderLayout("/About");
    const first = firstFocusableSnippet(html);

    assert.ok(first, "expected a focusable element");
    assert.match(first, /^<a\b/i);
    assert.match(first, /href="#main-content"/);
    assert.match(html, /<main\b[^>]*\bid="main-content"/);
  });

  it("uses min-h-screen without h-screen overflow-y-clip on the root wrapper", () => {
    const html = renderLayout("/About");
    const rootMatch = html.match(/<div class="([^"]*\bbg-tertiary\b[^"]*)"/);
    assert.ok(rootMatch, "expected the tertiary root wrapper");
    const className = rootMatch[1];
    const classes = className.split(/\s+/);

    assert.ok(classes.includes("min-h-screen"));
    assert.ok(!classes.includes("h-screen"));
    assert.ok(!classes.includes("overflow-y-clip"));
  });

  it("hides the footer on the home pathname", () => {
    const html = renderLayout("/");
    assert.doesNotMatch(html, /data-footer="true"/);
  });

  it("renders the footer on non-home pathnames", () => {
    const html = renderLayout("/Projects");
    assert.match(html, /data-footer="true"/);
  });

  it("sets page transition duration to 0 when reduced motion is preferred", () => {
    renderLayout("/About", true);
    assert.equal(lastMainTransition?.duration, 0);
  });
});
