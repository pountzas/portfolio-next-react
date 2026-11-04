/** Shared Projects card/dialog a11y helpers — plain ESM for node --test. */

/**
 * Accessible name for the collapsed card open control.
 * @param {string} name
 * @returns {string}
 */
export function openDetailsAriaLabel(name) {
  return `Open details for ${name}`;
}

/** Named external GitHub link (collapsed icon-only + expanded). */
export const GITHUB_LINK_ARIA_LABEL = "GitHub (opens in a new tab)";

/** Named external live demo link (collapsed icon-only + expanded). */
export const LIVE_DEMO_LINK_ARIA_LABEL = "Live demo (opens in a new tab)";

/** Close control on the expanded project dialog. */
export const CLOSE_DIALOG_ARIA_LABEL = "Close";

/** Backdrop dismiss control (must not be aria-hidden if clickable). */
export const CLOSE_OVERLAY_ARIA_LABEL = "Close dialog overlay";

/** 44×44 CSS px touch target (2.5.8). */
export const TOUCH_TARGET_CLASS_NAME = "min-h-11 min-w-11";

/**
 * Collapsed GitHub / Live chip text — buffer above the 4.50 knife-edge
 * `text-textSecondary` on `bg-textTertiary` (WCAG 1.4.3).
 * `#16191B` on `#9C98B0` ≈ 6.33:1.
 */
export const COLLAPSED_CHIP_TEXT_CLASS_NAME = "text-primary";

/** Collapsed GitHub / Live chip background. */
export const COLLAPSED_CHIP_BG_CLASS_NAME = "bg-textTertiary";

/**
 * Classes that clip when users apply WCAG 1.4.12 text spacing.
 * ProjectCard must not use these on visible content.
 */
export const TEXT_SPACING_CLIP_CLASS_NAMES = Object.freeze([
  "whitespace-nowrap",
  "line-clamp-1",
  "line-clamp-2",
  "line-clamp-3",
]);

/**
 * Return which text-spacing clip classes appear in source.
 * @param {string} source
 * @returns {string[]}
 */
export function findTextSpacingClipClasses(source) {
  if (typeof source !== "string" || source.length === 0) {
    return [];
  }

  return TEXT_SPACING_CLIP_CLASS_NAMES.filter((className) => {
    const pattern = new RegExp(
      `(^|[\\s"'\\\`])${className.replace(/-/g, "\\-")}([\\s"'\\\`]|$)`,
    );
    return pattern.test(source);
  });
}

/**
 * True when collapsed chip markup uses buffer contrast (primary or white)
 * on the tertiary chip background, not knife-edge textSecondary.
 * Accepts adjacent COLLAPSED_CHIP_* token interpolation or literal classes.
 * Does not treat expanded `text-white` near `hover:bg-textTertiary` as a hit,
 * and does not count import-only token names without `${...}` usage.
 * @param {string} source
 * @returns {boolean}
 */
export function hasCollapsedChipContrastBuffer(source) {
  if (typeof source !== "string" || source.length === 0) {
    return false;
  }

  const usesKnifeEdge =
    /text-textSecondary[\s\S]{0,80}(?<!hover:)bg-textTertiary|(?<!hover:)bg-textTertiary[\s\S]{0,80}text-textSecondary/.test(
      source,
    );
  if (usesKnifeEdge) {
    return false;
  }

  const usesTokenPair =
    /\$\{COLLAPSED_CHIP_TEXT_CLASS_NAME\}[\s\S]{0,80}\$\{COLLAPSED_CHIP_BG_CLASS_NAME\}|\$\{COLLAPSED_CHIP_BG_CLASS_NAME\}[\s\S]{0,80}\$\{COLLAPSED_CHIP_TEXT_CLASS_NAME\}/.test(
      source,
    );
  if (usesTokenPair) {
    return true;
  }

  const usesLiteralBuffer =
    /text-primary[\s\S]{0,120}(?<!hover:)bg-textTertiary|(?<!hover:)bg-textTertiary[\s\S]{0,120}text-primary|text-white[\s\S]{0,120}(?<!hover:)bg-textTertiary|(?<!hover:)bg-textTertiary[\s\S]{0,120}text-white/.test(
      source,
    );
  return usesLiteralBuffer;
}

/** Focusable selectors inside the expanded dialog for Tab trapping. */
export const DIALOG_FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Collect focusable elements within a dialog container.
 * @param {ParentNode | null | undefined} container
 * @returns {HTMLElement[]}
 */
export function getFocusableElements(container) {
  if (!container || typeof container.querySelectorAll !== "function") {
    return [];
  }

  return Array.from(
    container.querySelectorAll(DIALOG_FOCUSABLE_SELECTOR),
  ).filter((element) => {
    if (!(element instanceof HTMLElement)) {
      return false;
    }
    if (element.hasAttribute("disabled")) {
      return false;
    }
    if (element.getAttribute("aria-hidden") === "true") {
      return false;
    }
    return true;
  });
}

/**
 * Decide which element should receive focus on Tab / Shift+Tab at the edges.
 * @param {HTMLElement[]} focusable
 * @param {Element | null} activeElement
 * @param {boolean} shiftKey
 * @returns {HTMLElement | null} element to focus, or null to let the browser move
 */
export function nextFocusTarget(focusable, activeElement, shiftKey) {
  if (focusable.length === 0) {
    return null;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const activeIsInside = focusable.includes(
    /** @type {HTMLElement} */ (activeElement),
  );

  if (shiftKey) {
    if (!activeIsInside || activeElement === first) {
      return last;
    }
    return null;
  }

  if (!activeIsInside || activeElement === last) {
    return first;
  }
  return null;
}

/**
 * Handle Tab trap + Escape for an expanded project dialog.
 * @param {{ key: string, shiftKey?: boolean, preventDefault?: () => void }} event
 * @param {{ container: ParentNode | null | undefined, onClose: () => void, getActiveElement?: () => Element | null }} options
 * @returns {boolean} true if the event was handled
 */
export function handleProjectDialogKeyDown(event, options) {
  const { container, onClose, getActiveElement } = options;

  if (event.key === "Escape") {
    event.preventDefault?.();
    onClose();
    return true;
  }

  if (event.key !== "Tab") {
    return false;
  }

  const focusable = getFocusableElements(container);
  if (focusable.length === 0) {
    event.preventDefault?.();
    return true;
  }

  const active =
    typeof getActiveElement === "function"
      ? getActiveElement()
      : typeof document !== "undefined"
        ? document.activeElement
        : null;

  const target = nextFocusTarget(
    focusable,
    active,
    Boolean(event.shiftKey),
  );
  if (target) {
    event.preventDefault?.();
    target.focus();
    return true;
  }

  return false;
}

/**
 * Pick a live element to restore focus to after a dialog closes.
 * Prefers `preferred` when it is still connected; otherwise `fallback`
 * (e.g. remounted open control after the opener unmounted while open).
 * @param {{ focus: () => void; isConnected?: boolean } | null | undefined} preferred
 * @param {{ focus: () => void; isConnected?: boolean } | null | undefined} fallback
 * @returns {{ focus: () => void; isConnected?: boolean } | null}
 */
export function resolveFocusRestoreTarget(preferred, fallback) {
  if (preferred && preferred.isConnected !== false) {
    return preferred;
  }
  return fallback ?? null;
}
