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
