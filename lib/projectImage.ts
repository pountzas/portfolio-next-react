import type { GitHubRepository } from "../types/github";

export const GITHUB_OWNER = "pountzas";

export const PROJECT_IMAGE_CANDIDATES = [
  { file: "image.png", contentType: "image/png" },
  { file: "image.webp", contentType: "image/webp" },
  { file: "image.jpg", contentType: "image/jpeg" },
  { file: "image.jpeg", contentType: "image/jpeg" }
] as const;

export const REPO_NAME_PATTERN = /^[A-Za-z0-9._-]+$/;

export function getProjectImageSrc(
  repo: Pick<GitHubRepository, "name" | "isPrivate" | "openGraphImageUrl">
): string {
  if (!repo.isPrivate) {
    return repo.openGraphImageUrl;
  }

  return `/api/project-image/${encodeURIComponent(repo.name)}`;
}
