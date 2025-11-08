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

export interface GitHubRepository {
  id: string;
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  forkCount: number;
  stargazerCount: number;
  openGraphImageUrl: string;
  cloneCount?: number;
  viewCount?: number;
  assignableUsers: AssignableUsersConnection;
  repositoryTopics: RepositoryTopicsConnection;
  watchers: WatchersConnection;
  object?: CommitObject | null;
}

export interface PinnedItemEdge {
  node: GitHubRepository;
}

export interface PinnedItemsConnection {
  edges: PinnedItemEdge[];
}

export interface GitHubUserProfile {
  id: string;
  pinnedItems: PinnedItemsConnection;
}

export interface GitHubApiResponse {
  user: GitHubUserProfile;
}

// Type for the processed pinned items used in components
export type PinnedRepository = GitHubRepository;
