import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import {
  CONTACT_ERROR_MESSAGES,
  CONTACT_FIELD_ORDER,
  FIELD_AUTOCOMPLETE,
  errorElementId,
  fieldErrorAriaProps,
  firstErrorFieldId,
  focusFirstErrorField,
  statusLiveRegionProps,
  validateContactForm,
} from "./contactFormA11y.mjs";

const pagesDir = dirname(fileURLToPath(import.meta.url));

function readContact() {
  return readFileSync(join(pagesDir, "Contact.tsx"), "utf8");
}

function readContactApi() {
  return readFileSync(join(pagesDir, "api", "contact.ts"), "utf8");
}

describe("contactFormA11y helpers", () => {
  it("orders fields name → email → subject → message", () => {
    assert.deepEqual(CONTACT_FIELD_ORDER, [
      "name",
      "email",
      "subject",
      "message",
    ]);
  });

  it("uses WCAG autocomplete tokens for name and email only", () => {
    assert.equal(FIELD_AUTOCOMPLETE.name, "name");
    assert.equal(FIELD_AUTOCOMPLETE.email, "email");
    assert.equal("subject" in FIELD_AUTOCOMPLETE, false);
    assert.equal("message" in FIELD_AUTOCOMPLETE, false);
  });

  it("builds unique error element ids per field", () => {
    assert.equal(errorElementId("name"), "name-error");
    assert.equal(errorElementId("email"), "email-error");
    assert.equal(errorElementId("subject"), "subject-error");
    assert.equal(errorElementId("message"), "message-error");
  });

  it("returns first error field id in DOM order", () => {
    assert.equal(
      firstErrorFieldId({ email: "x", message: "y" }),
      "email",
    );
    assert.equal(
      firstErrorFieldId({ name: "n", email: "e" }),
      "name",
    );
    assert.equal(firstErrorFieldId({}), null);
  });

  it("validateContactForm fails empty submit with Name first", () => {
    const result = validateContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    assert.equal(result.isValid, false);
    assert.equal(result.errors.name, CONTACT_ERROR_MESSAGES.nameRequired);
    assert.equal(result.errors.email, CONTACT_ERROR_MESSAGES.emailRequired);
    assert.equal(result.firstErrorFieldId, "name");
  });

  it("validateContactForm flags invalid email with aligned message", () => {
    const result = validateContactForm({
      name: "Nik",
      email: "not-an-email",
      subject: "Hello there",
      message: "Long enough message body",
    });
    assert.equal(result.isValid, false);
    assert.equal(result.errors.email, CONTACT_ERROR_MESSAGES.emailInvalid);
    assert.equal(result.firstErrorFieldId, "email");
  });

  it("fieldErrorAriaProps ties invalid fields to error ids", () => {
    assert.deepEqual(fieldErrorAriaProps("name", {}), {
      "aria-invalid": false,
    });
    assert.deepEqual(
      fieldErrorAriaProps("name", { name: CONTACT_ERROR_MESSAGES.nameRequired }),
      {
        "aria-invalid": true,
        "aria-describedby": "name-error",
      },
    );
  });

  it("statusLiveRegionProps maps error to alert/assertive and success to status/polite", () => {
    assert.deepEqual(statusLiveRegionProps("error"), {
      role: "alert",
      "aria-live": "assertive",
    });
    assert.deepEqual(statusLiveRegionProps("success"), {
      role: "status",
      "aria-live": "polite",
    });
    assert.deepEqual(statusLiveRegionProps(null), {});
  });

  it("focusFirstErrorField focuses the element id when present", () => {
    let focused = null;
    const doc = {
      getElementById(id) {
        if (id !== "name") {
          return null;
        }
        return {
          focus() {
            focused = id;
          },
        };
      },
    };
    focusFirstErrorField("name", doc);
    assert.equal(focused, "name");
  });
});

describe("Contact.tsx source contracts", () => {
  it("keeps Get In Touch h1 and PascalCase Contact canonical", () => {
    const contact = readContact();
    assert.match(contact, /<motion\.h1\b[\s\S]*?Get In Touch/);
    assert.match(
      contact,
      /pountzas-portfolio\.vercel\.app\/Contact/,
    );
    assert.doesNotMatch(
      contact,
      /pountzas-portfolio\.vercel\.app\/contact["']/,
    );
  });

  it("sets autocomplete name/email, required, and aria-required on inputs", () => {
    const contact = readContact();
    assert.match(contact, /autoComplete=["']name["']/);
    assert.match(contact, /autoComplete=["']email["']/);
    assert.doesNotMatch(
      contact,
      /name=["']subject["'][\s\S]{0,200}?autoComplete=/,
    );
    assert.doesNotMatch(
      contact,
      /name=["']message["'][\s\S]{0,200}?autoComplete=/,
    );
    assert.match(contact, /\brequired\b/);
    assert.match(contact, /aria-required=["']true["']/);
  });

  it("wires aria-invalid and aria-describedby to per-field error ids", () => {
    const contact = readContact();
    assert.match(contact, /aria-invalid=\{Boolean\(errors\.name\)\}/);
    assert.match(contact, /aria-describedby=\{errors\.name \? ["']name-error["'] : undefined\}/);
    assert.match(contact, /id=["']name-error["']/);
    assert.match(contact, /id=["']email-error["']/);
    assert.match(contact, /id=["']subject-error["']/);
    assert.match(contact, /id=["']message-error["']/);
  });

  it("focuses the first invalid field after failed validateForm", () => {
    const contact = readContact();
    assert.match(
      contact,
      /document\.getElementById\([^)]*\)\?\.focus\(\)/,
    );
    assert.match(contact, /firstErrorFieldId|firstError/);
  });

  it("exposes status live region roles for success and error", () => {
    const contact = readContact();
    assert.match(
      contact,
      /role=\{[^}]*type === ["']error["'] \? ["']alert["'] : ["']status["']/,
    );
    assert.match(
      contact,
      /aria-live=\{[^}]*type === ["']error["'] \? ["']assertive["'] : ["']polite["']/,
    );
  });

  it("removes focus:outline-none, uses document flow, mailto, and aria-hidden emoji", () => {
    const contact = readContact();
    assert.doesNotMatch(contact, /focus:outline-none/);
    assert.doesNotMatch(contact, /h-\[calc\(100vh-111px\)\]/);
    assert.doesNotMatch(contact, /overflow-y-auto/);
    assert.match(contact, /\bpb-/);
    assert.match(
      contact,
      /href=["']mailto:nikos@pountzas\.gr["']/,
    );
    assert.match(contact, /aria-hidden/);
  });
});

describe("contact API error string alignment", () => {
  it("uses the same invalid-email suggestion as the client", () => {
    const api = readContactApi();
    assert.match(
      api,
      new RegExp(
        CONTACT_ERROR_MESSAGES.emailInvalid.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      ),
    );
    assert.doesNotMatch(api, /Please provide a valid email address/);
  });
});
