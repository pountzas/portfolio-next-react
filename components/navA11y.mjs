/** Shared nav a11y helpers — plain ESM for node --test without mocks. */

export const PRIMARY_NAV_ARIA_LABEL = "Primary";
export const BRAND_NAME = "Nikos Pountzas";
export const BRAND_HREF = "/";

/** Canonical primary nav order and PascalCase routes (locked). */
export const NAV_ITEMS = Object.freeze([
  Object.freeze({ label: "Home", path: "/" }),
  Object.freeze({ label: "About", path: "/About" }),
  Object.freeze({ label: "Projects", path: "/Projects" }),
  Object.freeze({ label: "Skills", path: "/Skills" }),
  Object.freeze({ label: "Contact", path: "/Contact" }),
]);

/**
 * @param {string} pathname
 * @param {string} path
 * @returns {boolean}
 */
export function isNavItemActive(pathname, path) {
  return pathname === path;
}

/**
 * @param {boolean} isActive
 * @returns {"page" | undefined}
 */
export function ariaCurrentPage(isActive) {
  return isActive ? "page" : undefined;
}
