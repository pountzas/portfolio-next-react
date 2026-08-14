import { createReadStream } from "fs";
import { join } from "path";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  GITHUB_OWNER,
  PROJECT_IMAGE_CANDIDATES,
  REPO_NAME_PATTERN
} from "../../../lib/projectImage";

const FALLBACK_FILE = join(process.cwd(), "public", "images", "project-fallback.png");
const CACHE_CONTROL = "public, s-maxage=60, stale-while-revalidate=300";

export const config = {
  api: {
    responseLimit: "4mb"
  }
};

function sendFallback(res: NextApiResponse): void {
  res.setHeader("Content-Type", "image/png");
  res.setHeader("Cache-Control", CACHE_CONTROL);
  res.status(200);
  createReadStream(FALLBACK_FILE).pipe(res);
}

function getRepoName(query: NextApiRequest["query"]): string | null {
  const value = query.repo;
  const repo = Array.isArray(value) ? value[0] : value;
  if (!repo || !REPO_NAME_PATTERN.test(repo)) {
    return null;
  }
  return repo;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).end();
    return;
  }

  const repo = getRepoName(req.query);
  const token = process.env.GITHUB_ACCESS_TOKEN;

  if (!repo || !token) {
    sendFallback(res);
    return;
  }

  try {
    for (const candidate of PROJECT_IMAGE_CANDIDATES) {
      const url = `https://api.github.com/repos/${GITHUB_OWNER}/${repo}/contents/${candidate.file}`;
      const response = await fetch(url, {
        headers: {
          Accept: "application/vnd.github.raw",
          Authorization: `Bearer ${token}`,
          "User-Agent": "pountzas-portfolio",
          "X-GitHub-Api-Version": "2022-11-28"
        }
      });

      if (!response.ok) {
        continue;
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      if (buffer.byteLength === 0) {
        continue;
      }

      res.setHeader("Content-Type", candidate.contentType);
      res.setHeader("Cache-Control", CACHE_CONTROL);
      res.status(200).send(buffer);
      return;
    }
  } catch {
    sendFallback(res);
    return;
  }

  sendFallback(res);
}
