/** Shared Skills dialog / SVG a11y helpers — plain ESM for node --test. */

/**
 * Unique linearGradient id for a skill's fire SVG (avoids duplicate IDs).
 * @param {string|number} id
 * @returns {string}
 */
export function skillFireGradientId(id) {
  return `fireGradient-${id}`;
}

/**
 * Stable id for the dialog title used by aria-labelledby.
 * @param {string|number} id
 * @returns {string}
 */
export function skillTitleId(id) {
  return `skill-title-${id}`;
}

/**
 * Visible + programmatic proficiency label next to the bar.
 * @param {number} proficiency
 * @returns {string}
 */
export function skillProficiencyLabel(proficiency) {
  return `Proficiency ${proficiency}%`;
}

/** Close control target size (2.5.8). */
export const SKILL_CLOSE_BUTTON_CLASS_NAME =
  "absolute top-4 right-4 min-h-11 min-w-11 text-textTertiary hover:text-textPrimary text-xl inline-flex items-center justify-center";

/** react-icons in lib/skills that Axe flagged for svg-img-alt (must be aria-hidden). */
export const AXE_FLAGGED_REACT_ICON_NAMES = [
  "SiRust",
  "SiTauri",
  "SiElectron",
  "SiGraphql",
  "SiNetlify",
  "SiHeroku",
  "TbBrandVercel",
];
