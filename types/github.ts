// GitHub GraphQL API Types

export interface GitHubUser {
  id: string;
  avatarUrl: string;
  name: string | null;
}

export interface RepositoryTopic {
  id: string;
  topic: {
    name: string;
  };
}

export interface RepositoryTopicsConnection {
  edges: Array<{
    node: RepositoryTopic;
  }>;
}

export interface AssignableUsersConnection {
  edges: Array<{
    node: GitHubUser;
  }>;
}

export interface WatchersConnection {
  totalCount: number;
}

export interface CommitHistory {
  totalCount: number;
}

export interface CommitObject {
  id: string;
  history: CommitHistory;
}

export interface DefaultBranchRef {
  name: string;
  target?: CommitObject | null;
}

export interface ReleasesConnection {
  totalCount: number;
}

export interface ConnectionPageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface ReleaseAsset {
  downloadCount: number;
}

export interface ReleaseAssetsConnection {
  nodes: ReleaseAsset[];
  pageInfo?: ConnectionPageInfo;
}

export interface ReleaseNode {
  id?: string;
  releaseAssets: ReleaseAssetsConnection;
}

export interface ReleasesWithAssetsConnection {
  nodes: ReleaseNode[];
  pageInfo?: ConnectionPageInfo;
}

export interface GitHubRepository {
  __typename?: string;
  id: string;
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  forkCount: number;
  stargazerCount: number;
  openGraphImageUrl: string;
  isPrivate: boolean;
  defaultBranchRef: DefaultBranchRef | null;
  cloneCount?: number;
  viewCount?: number;
  releases?: ReleasesConnection;
  releaseCount?: number;
  downloadCount?: number;
  /** npm registry downloads for the last year (package projects only). */
  npmInstallCount?: number;
  assignableUsers: AssignableUsersConnection;
  repositoryTopics: RepositoryTopicsConnection;
  watchers: WatchersConnection;
  object?: CommitObject | null;
}

export interface PinnedItemEdge {
  node: GitHubRepository | { __typename?: string };
}

export interface PinnedItemsConnection {
  edges: PinnedItemEdge[];
}

export interface RepositoryEdge {
  node: GitHubRepository;
}

export interface RepositoriesConnection {
  edges: RepositoryEdge[];
}

export interface GitHubUserProfile {
  id: string;
  pinnedItems: PinnedItemsConnection;
  repositories: RepositoriesConnection;
}

export interface GitHubApiResponse {
  user: GitHubUserProfile;
}

// Type for the processed pinned items used in components
export type PinnedRepository = GitHubRepository;

export function isGitHubRepository(node: unknown): node is GitHubRepository {
  if (!node || typeof node !== "object") {
    return false;
  }

  if ("__typename" in node && typeof node.__typename === "string") {
    return node.__typename === "Repository";
  }

  return (
    "name" in node &&
    "url" in node &&
    "isPrivate" in node &&
    "openGraphImageUrl" in node
  );
}
