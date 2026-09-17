/** Shared contact form a11y + validation contracts for WCAG Task 7. */

export const CONTACT_FIELD_ORDER = Object.freeze([
  "name",
  "email",
  "subject",
  "message",
]);

/** Client + API aligned suggestion strings (3.3.3). */
export const CONTACT_ERROR_MESSAGES = Object.freeze({
  nameRequired: "Name is required",
  nameMin: "Name must be at least 2 characters",
  emailRequired: "Email is required",
  emailInvalid: "Please enter a valid email address",
  subjectRequired: "Subject is required",
  subjectMin: "Subject must be at least 5 characters",
  messageRequired: "Message is required",
  messageMin: "Message must be at least 10 characters",
  allRequired: "All fields are required",
});

export const FIELD_AUTOCOMPLETE = Object.freeze({
  name: "name",
  email: "email",
});

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * @param {string} field
 * @returns {string}
 */
export function errorElementId(field) {
  return `${field}-error`;
}

/**
 * @param {Record<string, string | undefined>} errors
 * @returns {string | null}
 */
export function firstErrorFieldId(errors) {
  for (const field of CONTACT_FIELD_ORDER) {
    if (errors[field]) {
      return field;
    }
  }
  return null;
}

/**
 * @param {{ name?: string, email?: string, subject?: string, message?: string }} formData
 * @returns {{ errors: Record<string, string>, isValid: boolean, firstErrorFieldId: string | null }}
 */
export function validateContactForm(formData) {
  /** @type {Record<string, string>} */
  const errors = {};
  const name = (formData.name ?? "").trim();
  const email = (formData.email ?? "").trim();
  const subject = (formData.subject ?? "").trim();
  const message = (formData.message ?? "").trim();

  if (!name) {
    errors.name = CONTACT_ERROR_MESSAGES.nameRequired;
  } else if (name.length < 2) {
    errors.name = CONTACT_ERROR_MESSAGES.nameMin;
  }

  if (!email) {
    errors.email = CONTACT_ERROR_MESSAGES.emailRequired;
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = CONTACT_ERROR_MESSAGES.emailInvalid;
  }

  if (!subject) {
    errors.subject = CONTACT_ERROR_MESSAGES.subjectRequired;
  } else if (subject.length < 5) {
    errors.subject = CONTACT_ERROR_MESSAGES.subjectMin;
  }

  if (!message) {
    errors.message = CONTACT_ERROR_MESSAGES.messageRequired;
  } else if (message.length < 10) {
    errors.message = CONTACT_ERROR_MESSAGES.messageMin;
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
    firstErrorFieldId: firstErrorFieldId(errors),
  };
}

/**
 * @param {string} field
 * @param {Record<string, string | undefined>} errors
 * @returns {{ "aria-invalid": boolean, "aria-describedby"?: string }}
 */
export function fieldErrorAriaProps(field, errors) {
  const hasError = Boolean(errors[field]);
  if (!hasError) {
    return { "aria-invalid": false };
  }
  return {
    "aria-invalid": true,
    "aria-describedby": errorElementId(field),
  };
}

/**
 * @param {"success" | "error" | null | undefined} type
 * @returns {{ role?: string, "aria-live"?: string }}
 */
export function statusLiveRegionProps(type) {
  if (type === "error") {
    return { role: "alert", "aria-live": "assertive" };
  }
  if (type === "success") {
    return { role: "status", "aria-live": "polite" };
  }
  return {};
}

/**
 * Focus the first invalid field after failed validation (2.4.3 / 3.3.1).
 * @param {string | null | undefined} fieldId
 * @param {{ getElementById: (id: string) => { focus: () => void } | null } | null | undefined} doc
 */
export function focusFirstErrorField(fieldId, doc = globalThis.document) {
  if (!fieldId || !doc) {
    return;
  }
  doc.getElementById(fieldId)?.focus();
}
