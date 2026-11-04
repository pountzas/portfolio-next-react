/** Shared page heading + canonical URL contracts for WCAG Task 6. */

export const SITE_ORIGIN = "https://pountzas-portfolio.vercel.app";

export const PAGE_H1 = Object.freeze({
  home: "Hello I am Nikos.",
  about: "About Me",
  projects: "Projects",
  skills: "Skills",
  contact: "Get In Touch",
});

/** PascalCase paths matching live Pages Router routes (locked decision). */
export const PAGE_CANONICAL_PATH = Object.freeze({
  home: "/",
  about: "/About",
  projects: "/Projects",
  skills: "/Skills",
  contact: "/Contact",
});

/**
 * @param {string} path
 * @returns {string}
 */
export function canonicalHref(path) {
  if (path === "/") {
    return SITE_ORIGIN;
  }
  return `${SITE_ORIGIN}${path}`;
}
