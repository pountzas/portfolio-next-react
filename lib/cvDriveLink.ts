import { JWT } from "google-auth-library";

const DRIVE_READONLY_SCOPE = "https://www.googleapis.com/auth/drive.readonly";
const DRIVE_FILES_LIST_URL = "https://www.googleapis.com/drive/v3/files";

/** Exact Drive file name used for the home-page My CV link. */
export const CV_DRIVE_FILE_NAME = "CV Pountzas Nikolaos";

export function buildCvViewUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
}

export function buildDriveFileListQuery(folderId: string, fileName: string): string {
  return `name = '${fileName}' and '${folderId}' in parents and trashed = false`;
}

export type ResolveCvDriveUrlDeps = {
  env?: NodeJS.Dict<string | undefined>;
  fetchFn?: typeof fetch;
  getAccessToken?: (env: NodeJS.Dict<string | undefined>) => Promise<string | null>;
};

type DriveFilesListResponse = {
  files?: Array<{ id?: string }>;
};

function readConfiguredEnv(env: NodeJS.Dict<string | undefined>): {
  folderId: string;
  email: string;
  privateKey: string;
} | null {
  const folderId = env.GOOGLE_DRIVE_FOLDER_ID?.trim();
  const email = env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const privateKeyRaw = env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.trim();

  if (!folderId || !email || !privateKeyRaw) {
    return null;
  }

  return {
    folderId,
    email,
    privateKey: privateKeyRaw.replace(/\\n/g, "\n")
  };
}

async function getServiceAccountAccessToken(
  env: NodeJS.Dict<string | undefined>
): Promise<string | null> {
  const configured = readConfiguredEnv(env);
  if (!configured) {
    return null;
  }

  try {
    const client = new JWT({
      email: configured.email,
      key: configured.privateKey,
      scopes: [DRIVE_READONLY_SCOPE]
    });
    const tokenResponse = await client.getAccessToken();
    return tokenResponse.token ?? null;
  } catch (error) {
    console.error("Failed to obtain Google Drive access token", error);
    return null;
  }
}

export async function resolveCvDriveUrl(
  deps: ResolveCvDriveUrlDeps = {}
): Promise<string | null> {
  const env = deps.env ?? process.env;
  const fetchFn = deps.fetchFn ?? fetch;
  const getAccessToken = deps.getAccessToken ?? getServiceAccountAccessToken;

  const configured = readConfiguredEnv(env);
  if (!configured) {
    return null;
  }

  const accessToken = await getAccessToken(env);
  if (!accessToken) {
    return null;
  }

  const query = buildDriveFileListQuery(configured.folderId, CV_DRIVE_FILE_NAME);
  const url = new URL(DRIVE_FILES_LIST_URL);
  url.searchParams.set("q", query);
  url.searchParams.set("spaces", "drive");
  url.searchParams.set("fields", "files(id)");
  url.searchParams.set("pageSize", "1");

  try {
    const response = await fetchFn(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      console.error(
        `Google Drive files.list failed with status ${response.status}`
      );
      return null;
    }

    const data = (await response.json()) as DriveFilesListResponse;
    const fileId = data.files?.[0]?.id;
    if (!fileId) {
      console.error(
        `Google Drive file not found for name "${CV_DRIVE_FILE_NAME}" in folder "${configured.folderId}"`
      );
      return null;
    }

    return buildCvViewUrl(fileId);
  } catch (error) {
    console.error("Google Drive CV lookup failed", error);
    return null;
  }
}
