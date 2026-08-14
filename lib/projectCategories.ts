import type { GitHubRepository } from "../types/github";

export type ProjectCategoryId =
  | "pinned"
  | "web"
  | "mobile"
  | "desktop"
  | "dependencies";

export interface ProjectCategory {
  id: ProjectCategoryId;
  label: string;
  emptyMessage: string;
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  {
    id: "pinned",
    label: "Pinned",
    emptyMessage: "No pinned projects available."
  },
  {
    id: "web",
    label: "Web Apps",
    emptyMessage: "No web apps tagged yet."
  },
  {
    id: "mobile",
    label: "Mobile Apps",
    emptyMessage: "No mobile apps tagged yet."
  },
  {
    id: "desktop",
    label: "Windows/MacOS",
    emptyMessage: "No Windows/MacOS apps tagged yet."
  },
  {
    id: "dependencies",
    label: "Dependencies",
    emptyMessage: "No dependencies tagged yet."
  }
];

export const CATEGORY_TOPICS: Record<
  Exclude<ProjectCategoryId, "pinned">,
  readonly string[]
> = {
  web: ["web", "web-app", "nextjs"],
  mobile: ["mobile", "react-native", "android", "ios"],
  desktop: ["desktop", "electron", "windows", "macos", "tauri", "tauri-v2"],
  dependencies: ["dependency", "dependencies", "package"]
};

export const CATEGORY_LIMIT = 12;

export const EXCLUDED_TOPICS = ["template"] as const;

export function getRepositoryTopicNames(repo: GitHubRepository): string[] {
  return (repo.repositoryTopics?.edges || []).map((edge) =>
    edge.node.topic.name.toLowerCase()
  );
}

export function hasExcludedTopic(repo: GitHubRepository): boolean {
  const topicNames = getRepositoryTopicNames(repo);
  return EXCLUDED_TOPICS.some((excluded) => topicNames.includes(excluded));
}

export function excludeTemplateRepos(
  repos: GitHubRepository[]
): GitHubRepository[] {
  return repos.filter((repo) => !hasExcludedTopic(repo));
}

export function filterReposByTopics(
  repos: GitHubRepository[],
  topics: readonly string[],
  limit: number = CATEGORY_LIMIT
): GitHubRepository[] {
  const topicSet = new Set(topics.map((topic) => topic.toLowerCase()));

  return repos
    .filter((repo) =>
      getRepositoryTopicNames(repo).some((topic) => topicSet.has(topic))
    )
    .slice(0, limit);
}

export function getProjectsForCategory(
  categoryId: ProjectCategoryId,
  pinnedItems: GitHubRepository[],
  repositories: GitHubRepository[]
): GitHubRepository[] {
  const visiblePinned = excludeTemplateRepos(pinnedItems);
  const visibleRepos = excludeTemplateRepos(repositories);

  switch (categoryId) {
    case "pinned":
      return visiblePinned;
    case "web":
      return filterReposByTopics(visibleRepos, CATEGORY_TOPICS.web);
    case "mobile":
      return filterReposByTopics(visibleRepos, CATEGORY_TOPICS.mobile);
    case "desktop":
      return filterReposByTopics(visibleRepos, CATEGORY_TOPICS.desktop);
    case "dependencies":
      return filterReposByTopics(visibleRepos, CATEGORY_TOPICS.dependencies);
    default: {
      const _exhaustive: never = categoryId;
      return _exhaustive;
    }
  }
}
