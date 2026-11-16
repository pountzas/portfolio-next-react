/** Shared social/footer a11y helpers — plain ESM for node --test without mocks. */

/**
 * Accessible name for an external social profile link (Home + Footer).
 * @param {string} name
 * @returns {string}
 */
export function socialProfileAriaLabel(name) {
  return `Visit my ${name} profile`;
}

/** PascalCase routes matching live Axe-scanned URLs (2.4.5 footer sitemap). */
export const FOOTER_SITE_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/About" },
  { label: "Projects", href: "/Projects" },
  { label: "Skills", href: "/Skills" },
  { label: "Contact", href: "/Contact" },
];

/** Touch target classes for social icon links (2.5.8). */
export const SOCIAL_LINK_CLASS_NAME =
  "inline-flex min-h-11 min-w-11 items-center justify-center";
