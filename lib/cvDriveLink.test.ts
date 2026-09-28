import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  CV_DRIVE_FILE_NAME,
  buildCvViewUrl,
  buildDriveFileListQuery,
  resolveCvDriveUrl
} from "./cvDriveLink";

describe("buildCvViewUrl", () => {
  it("returns a Drive sharing view URL for the file id", () => {
    assert.equal(
      buildCvViewUrl("abc123"),
      "https://drive.google.com/file/d/abc123/view?usp=sharing"
    );
  });
});

describe("buildDriveFileListQuery", () => {
  it("builds a Drive q that matches name inside the parent folder", () => {
    assert.equal(
      buildDriveFileListQuery("folder123", CV_DRIVE_FILE_NAME),
      "name = 'CV Pountzas Nikolaos' and 'folder123' in parents and trashed = false"
    );
  });
});

describe("resolveCvDriveUrl", () => {
  const configuredEnv = {
    GOOGLE_DRIVE_FOLDER_ID: "folder123",
    GOOGLE_SERVICE_ACCOUNT_EMAIL: "cv@example.iam.gserviceaccount.com",
    GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: "fake-key"
  };

  it("looks up the fixed CV file name in Drive", async () => {
    let requestedUrl = "";
    const fetchFn: typeof fetch = async (input) => {
      requestedUrl = String(input);
      return new Response(JSON.stringify({ files: [{ id: "fileABC" }] }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    };

    const href = await resolveCvDriveUrl({
      env: configuredEnv,
      fetchFn,
      getAccessToken: async () => "token-123"
    });

    assert.equal(
      href,
      "https://drive.google.com/file/d/fileABC/view?usp=sharing"
    );
    assert.match(
      requestedUrl,
      /q=name\+%3D\+%27CV\+Pountzas\+Nikolaos%27/
    );
  });

  it("returns null when required env vars are missing", async () => {
    const href = await resolveCvDriveUrl({
      env: {},
      fetchFn: async () => {
        throw new Error("fetch should not be called");
      },
      getAccessToken: async () => {
        throw new Error("getAccessToken should not be called");
      }
    });

    assert.equal(href, null);
  });

  it("returns null when Drive returns no matching files", async () => {
    const fetchFn: typeof fetch = async () =>
      new Response(JSON.stringify({ files: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });

    const href = await resolveCvDriveUrl({
      env: configuredEnv,
      fetchFn,
      getAccessToken: async () => "token-123"
    });

    assert.equal(href, null);
  });

  it("returns null when Drive responds with an error status", async () => {
    const fetchFn: typeof fetch = async () =>
      new Response("forbidden", { status: 403 });

    const href = await resolveCvDriveUrl({
      env: configuredEnv,
      fetchFn,
      getAccessToken: async () => "token-123"
    });

    assert.equal(href, null);
  });
});
