import type {
  CommitObject,
  GitHubRepository,
  ReleasesWithAssetsConnection
} from "../types/github";
import {
  CATEGORY_TOPICS,
  filterReposByTopics,
  type ProjectCategoryId
} from "./projectCategories";

export interface RepositoryReleaseDownloadsNode {
  id: string;
  releases: ReleasesWithAssetsConnection;
}

export interface RepositoryCommitHistoryNode {
  id: string;
  defaultBranchRef: {
    name: string;
    target: CommitObject | null;
  } | null;
}

export interface RepositoryPackageJsonNode {
  id: string;
  name: string;
  object: { text: string } | null;
}

/** Sum downloadCount across release assets (up to query caps). */
export function sumReleaseDownloads(
  releases: ReleasesWithAssetsConnection | null | undefined
): number {
  if (!releases?.nodes?.length) {
    return 0;
  }

  let total = 0;
  for (const release of releases.nodes) {
    for (const asset of release.releaseAssets?.nodes ?? []) {
      total += asset.downloadCount ?? 0;
    }
  }
  return total;
}

export function collectRepoIdsWithReleases(
  repos: GitHubRepository[]
): string[] {
  const ids = new Set<string>();
  for (const repo of repos) {
    if ((repo.releases?.totalCount ?? 0) > 0) {
      ids.add(repo.id);
    }
  }
  return Array.from(ids);
}

const NON_PINNED_CATEGORIES = Object.keys(CATEGORY_TOPICS) as Array<
  Exclude<ProjectCategoryId, "pinned">
>;

/** Repo IDs shown on any Projects tab (pinned + category slices). */
export function collectDisplayedRepoIds(
  pinnedItems: GitHubRepository[],
  repositories: GitHubRepository[]
): string[] {
  const ids = new Set<string>();
  for (const repo of pinnedItems) {
    ids.add(repo.id);
  }
  for (const categoryId of NON_PINNED_CATEGORIES) {
    for (const repo of filterReposByTopics(
      repositories,
      CATEGORY_TOPICS[categoryId]
    )) {
      ids.add(repo.id);
    }
  }
  return Array.from(ids);
}

export function collectDependencyRepoIds(
  repositories: GitHubRepository[]
): string[] {
  return filterReposByTopics(
    repositories,
    CATEGORY_TOPICS.dependencies
  ).map((repo) => repo.id);
}

export interface ProjectStatPatch {
  commitTotalCount?: number;
  releaseCount?: number;
  downloadCount?: number;
  npmInstallCount?: number;
}

export type ProjectStatsById = Record<string, ProjectStatPatch>;

export function applyProjectStatsById(
  repos: GitHubRepository[],
  byId: ProjectStatsById
): GitHubRepository[] {
  return repos.map((repo) => {
    const patch = byId[repo.id];
    if (!patch) {
      return repo;
    }

    let next: GitHubRepository = { ...repo };

    if (patch.commitTotalCount !== undefined && next.defaultBranchRef) {
      next = {
        ...next,
        defaultBranchRef: {
          ...next.defaultBranchRef,
          target: {
            id: next.defaultBranchRef.target?.id ?? next.id,
            history: { totalCount: patch.commitTotalCount }
          }
        }
      };
    }

    if (patch.releaseCount !== undefined) {
      next = { ...next, releaseCount: patch.releaseCount };
    }

    if (patch.downloadCount !== undefined) {
      next = { ...next, downloadCount: patch.downloadCount };
    }

    if (patch.npmInstallCount !== undefined) {
      next = { ...next, npmInstallCount: patch.npmInstallCount };
    }

    return next;
  });
}

export function attachReleaseStats(
  repos: GitHubRepository[],
  downloadById: Map<string, number>
): GitHubRepository[] {
  return repos.map((repo) => {
    const releaseCount = repo.releases?.totalCount ?? 0;
    const { releases, ...rest } = repo;
    void releases;

    if (releaseCount <= 0) {
      return rest;
    }

    return {
      ...rest,
      releaseCount,
      downloadCount: downloadById.get(repo.id) ?? 0
    };
  });
}

export function attachCommitHistory(
  repos: GitHubRepository[],
  historyById: Map<string, CommitObject>
): GitHubRepository[] {
  return repos.map((repo) => {
    const target = historyById.get(repo.id);
    if (!target || !repo.defaultBranchRef) {
      return repo;
    }

    return {
      ...repo,
      defaultBranchRef: {
        ...repo.defaultBranchRef,
        target
      }
    };
  });
}

export function attachNpmInstallCounts(
  repos: GitHubRepository[],
  npmById: Map<string, number>
): GitHubRepository[] {
  return repos.map((repo) => {
    const npmInstallCount = npmById.get(repo.id);
    if (npmInstallCount === undefined) {
      return repo;
    }
    return { ...repo, npmInstallCount };
  });
}

export function buildDownloadCountMap(
  nodes: Array<RepositoryReleaseDownloadsNode | null>
): Map<string, number> {
  const map = new Map<string, number>();
  for (const node of nodes) {
    if (!node?.id) {
      continue;
    }
    map.set(node.id, sumReleaseDownloads(node.releases));
  }
  return map;
}

export function buildCommitHistoryMap(
  nodes: Array<RepositoryCommitHistoryNode | null>
): Map<string, CommitObject> {
  const map = new Map<string, CommitObject>();
  for (const node of nodes) {
    const target = node?.defaultBranchRef?.target;
    if (!node?.id || !target?.history) {
      continue;
    }
    map.set(node.id, target);
  }
  return map;
}

export function parsePackageJsonName(text: string | null | undefined): string | null {
  if (!text) {
    return null;
  }

  try {
    const parsed = JSON.parse(text) as { name?: unknown; private?: unknown };
    if (parsed.private === true) {
      return null;
    }
    if (typeof parsed.name === "string" && parsed.name.trim()) {
      return parsed.name.trim();
    }
  } catch {
    return null;
  }

  return null;
}

export function buildPackageNameByRepoId(
  nodes: Array<RepositoryPackageJsonNode | null>
): Map<string, string> {
  const map = new Map<string, string>();
  for (const node of nodes) {
    if (!node?.id) {
      continue;
    }
    const packageName = parsePackageJsonName(node.object?.text) ?? null;
    if (packageName) {
      map.set(node.id, packageName);
    }
  }
  return map;
}

export async function fetchNpmLastYearDownloads(
  packageName: string
): Promise<number | null> {
  // Scoped packages need `/` encoded as %2F in the path.
  const pathName = packageName.startsWith("@")
    ? packageName.replace("/", "%2F")
    : encodeURIComponent(packageName);

  try {
    const response = await fetch(
      `https://api.npmjs.org/downloads/point/last-year/${pathName}`
    );
    if (!response.ok) {
      return null;
    }
    const data = (await response.json()) as { downloads?: unknown };
    return typeof data.downloads === "number" ? data.downloads : null;
  } catch {
    return null;
  }
}

export async function fetchNpmInstallCountsByRepoId(
  packageNameByRepoId: Map<string, string>
): Promise<Map<string, number>> {
  const entries = Array.from(packageNameByRepoId.entries());
  const results = await Promise.all(
    entries.map(async ([repoId, packageName]) => {
      const downloads = await fetchNpmLastYearDownloads(packageName);
      return [repoId, downloads] as const;
    })
  );

  const map = new Map<string, number>();
  for (const [repoId, downloads] of results) {
    if (downloads !== null && downloads > 0) {
      map.set(repoId, downloads);
    }
  }
  return map;
}
