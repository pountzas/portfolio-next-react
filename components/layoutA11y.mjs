/** Shared Layout a11y helpers — plain ESM for node --test without mocks. */

export const MAIN_CONTENT_ID = "main-content";
export const SKIP_LINK_HREF = `#${MAIN_CONTENT_ID}`;

/**
 * @param {string} pathname
 * @returns {boolean}
 */
export function showFooter(pathname) {
  return pathname !== "/";
}

/**
 * @param {boolean | null} shouldReduceMotion
 * @returns {number}
 */
export function pageTransitionDuration(shouldReduceMotion) {
  return shouldReduceMotion ? 0 : 0.3;
}

/**
 * @param {boolean | null} shouldReduceMotion
 * @returns {number}
 */
export function footerTransitionDuration(shouldReduceMotion) {
  return shouldReduceMotion ? 0 : 0.4;
}
