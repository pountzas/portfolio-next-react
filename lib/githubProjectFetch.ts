import { gql, type ApolloClient } from "@apollo/client";
import {
  isGitHubRepository,
  type GitHubRepository,
  type GitHubUserProfile
} from "../types/github";
import { queryGithubWithRetry, queryGithubNodesInChunks } from "./githubQuery";
import { createGithubApolloClient } from "./githubApollo";
import {
  sumAssetDownloadCounts,
  sumReleaseDownloads,
  buildPackageNameByRepoId,
  collectDependencyRepoIds,
  collectDisplayedRepoIds,
  fetchNpmInstallCountsByRepoId,
  type ProjectStatPatch,
  type ProjectStatsById,
  type RepositoryCommitHistoryNode,
  type RepositoryPackageJsonNode,
  type RepositoryReleaseDownloadsNode
} from "./githubReleaseStats";
import { excludeTemplateRepos } from "./projectCategories";

const REPOSITORY_CARD_FIELDS = gql`
  fragment RepositoryCardFields on Repository {
    id
    name
    forkCount
    stargazerCount
    openGraphImageUrl
    isPrivate
    defaultBranchRef {
      name
    }
    assignableUsers(first: 3) {
      edges {
        node {
          id
          avatarUrl
          name
        }
      }
    }
    description
    url
    repositoryTopics(first: 20) {
      edges {
        node {
          id
          topic {
            name
          }
        }
      }
    }
    watchers {
      totalCount
    }
    homepageUrl
  }
`;

const PINNED_PROJECTS_QUERY = gql`
  query PinnedProjects {
    user(login: "pountzas") {
      id
      pinnedItems(first: 6) {
        edges {
          node {
            __typename
            ... on Repository {
              ...RepositoryCardFields
            }
          }
        }
      }
    }
  }
  ${REPOSITORY_CARD_FIELDS}
`;

const REPOSITORY_LIST_QUERY = gql`
  query RepositoryList {
    user(login: "pountzas") {
      repositories(
        first: 100
        ownerAffiliations: OWNER
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        edges {
          node {
            ...RepositoryCardFields
          }
        }
      }
    }
  }
  ${REPOSITORY_CARD_FIELDS}
`;

const COMMIT_AND_RELEASE_COUNT_QUERY = gql`
  query CommitAndReleaseCount($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Repository {
        id
        defaultBranchRef {
          name
          target {
            ... on Commit {
              id
              history {
                totalCount
              }
            }
          }
        }
        releases {
          totalCount
        }
      }
    }
  }
`;

const RELEASE_PAGE_SIZE = 50;
const ASSET_PAGE_SIZE = 50;
const MAX_CONNECTION_PAGES = 100;

const RELEASE_DOWNLOADS_QUERY = gql`
  query ReleaseDownloads($ids: [ID!]!, $after: String) {
    nodes(ids: $ids) {
      ... on Repository {
        id
        releases(first: 50, after: $after) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            id
            releaseAssets(first: 50) {
              pageInfo {
                hasNextPage
                endCursor
              }
              nodes {
                downloadCount
              }
            }
          }
        }
      }
    }
  }
`;

const RELEASE_ASSETS_PAGE_QUERY = gql`
  query ReleaseAssetsPage($id: ID!, $after: String) {
    node(id: $id) {
      ... on Release {
        releaseAssets(first: 50, after: $after) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            downloadCount
          }
        }
      }
    }
  }
`;

const PACKAGE_JSON_QUERY = gql`
  query PackageJson($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Repository {
        id
        name
        object(expression: "HEAD:package.json") {
          ... on Blob {
            text
          }
        }
      }
    }
  }
`;

export interface LightProjectLists {
  pinnedItems: GitHubRepository[];
  repositories: GitHubRepository[];
}

interface CountNode extends RepositoryCommitHistoryNode {
  releases?: { totalCount: number } | null;
}

async function loadOptionalStats<T>(
  label: string,
  load: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await load();
  } catch (error) {
    console.warn(`[project-stats] ${label} unavailable:`, error);
    return fallback;
  }
}

export async function fetchLightProjectLists(
  client: ApolloClient = createGithubApolloClient()
): Promise<LightProjectLists> {
  const [pinnedResult, repositoryResult] = await Promise.all([
    queryGithubWithRetry(
      () =>
        client.query<{ user: Pick<GitHubUserProfile, "id" | "pinnedItems"> }>({
          query: PINNED_PROJECTS_QUERY,
          fetchPolicy: "no-cache"
        }),
      2
    ),
    queryGithubWithRetry(
      () =>
        client.query<{ user: Pick<GitHubUserProfile, "repositories"> }>({
          query: REPOSITORY_LIST_QUERY,
          fetchPolicy: "no-cache"
        }),
      2
    )
  ]);

  const pinnedUser = pinnedResult.data?.user;
  const repositoryUser = repositoryResult.data?.user;

  if (!pinnedUser || !repositoryUser) {
    throw new Error("Failed to fetch GitHub data");
  }

  return {
    pinnedItems: excludeTemplateRepos(
      pinnedUser.pinnedItems.edges
        .map((edge) => edge.node)
        .filter(isGitHubRepository)
    ),
    repositories: excludeTemplateRepos(
      repositoryUser.repositories.edges.map((edge) => edge.node)
    )
  };
}

function collectReleaseIdsFromCountNodes(
  nodes: Array<CountNode | null>
): string[] {
  const ids: string[] = [];
  for (const node of nodes) {
    if (node?.id && (node.releases?.totalCount ?? 0) > 0) {
      ids.push(node.id);
    }
  }
  return ids;
}

interface ReleaseAssetsPage {
  pageInfo?: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
  nodes: Array<{ downloadCount: number }>;
}

async function queryReleaseDownloadsPage(
  client: ApolloClient,
  ids: string[],
  after?: string | null
): Promise<Array<RepositoryReleaseDownloadsNode | null>> {
  const result = await queryGithubWithRetry(
    () =>
      client.query<{
        nodes: Array<RepositoryReleaseDownloadsNode | null>;
      }>({
        query: RELEASE_DOWNLOADS_QUERY,
        variables: after ? { ids, after } : { ids },
        fetchPolicy: "no-cache"
      }),
    3
  );
  return result.data?.nodes ?? [];
}

async function sumRemainingReleaseAssets(
  client: ApolloClient,
  releaseId: string,
  after: string | null
): Promise<number> {
  let total = 0;
  let cursor: string | null = after;
  let pages = 0;

  while (cursor && pages < MAX_CONNECTION_PAGES) {
    pages += 1;
    const result = await queryGithubWithRetry(
      () =>
        client.query<{
          node: { releaseAssets?: ReleaseAssetsPage } | null;
        }>({
          query: RELEASE_ASSETS_PAGE_QUERY,
          variables: { id: releaseId, after: cursor },
          fetchPolicy: "no-cache"
        }),
      3
    );
    const assets = result.data?.node?.releaseAssets;
    total += sumAssetDownloadCounts(assets?.nodes);
    cursor = assets?.pageInfo?.hasNextPage
      ? assets.pageInfo.endCursor
      : null;
  }

  return total;
}

async function sumDownloadsFromReleasesPage(
  client: ApolloClient,
  releases: RepositoryReleaseDownloadsNode["releases"] | null | undefined
): Promise<number> {
  let total = sumReleaseDownloads(releases);

  for (const release of releases?.nodes ?? []) {
    const assets = release.releaseAssets;
    if (!release.id || !assets?.pageInfo?.hasNextPage) {
      continue;
    }
    total += await sumRemainingReleaseAssets(
      client,
      release.id,
      assets.pageInfo.endCursor
    );
  }

  return total;
}

async function fetchReleaseDownloadTotals(
  client: ApolloClient,
  repoIds: string[]
): Promise<Map<string, number>> {
  const totals = new Map<string, number>();
  if (repoIds.length === 0) {
    return totals;
  }

  const firstPages = await queryGithubNodesInChunks<RepositoryReleaseDownloadsNode>(
    repoIds,
    4,
    (ids) => queryReleaseDownloadsPage(client, ids)
  );

  for (const node of firstPages) {
    if (!node?.id) {
      continue;
    }

    let total = await sumDownloadsFromReleasesPage(client, node.releases);
    let cursor = node.releases?.pageInfo?.hasNextPage
      ? node.releases.pageInfo.endCursor
      : null;
    let pages = 1;

    while (cursor && pages < MAX_CONNECTION_PAGES) {
      pages += 1;
      const [nextNode] = await queryReleaseDownloadsPage(client, [node.id], cursor);
      total += await sumDownloadsFromReleasesPage(client, nextNode?.releases);
      cursor = nextNode?.releases?.pageInfo?.hasNextPage
        ? nextNode.releases.pageInfo.endCursor
        : null;
    }

    totals.set(node.id, total);
  }

  return totals;
}

export async function fetchProjectStatsById(options: {
  displayedIds: string[];
  dependencyIds: string[];
  client?: ApolloClient;
}): Promise<ProjectStatsById> {
  const client = options.client ?? createGithubApolloClient();
  const { displayedIds, dependencyIds } = options;

  const countNodes = await loadOptionalStats(
    "commit and release counts",
    () =>
      queryGithubNodesInChunks<CountNode>(displayedIds, 8, async (ids) => {
        const result = await queryGithubWithRetry(
          () =>
            client.query<{ nodes: Array<CountNode | null> }>({
              query: COMMIT_AND_RELEASE_COUNT_QUERY,
              variables: { ids },
              fetchPolicy: "no-cache"
            }),
          3
        );
        return result.data?.nodes ?? [];
      }),
    []
  );

  const releaseIds = collectReleaseIdsFromCountNodes(countNodes);

  const [downloadById, packageJsonNodes] = await Promise.all([
    loadOptionalStats(
      "release downloads",
      () => fetchReleaseDownloadTotals(client, releaseIds),
      new Map<string, number>()
    ),
    loadOptionalStats(
      "package.json",
      () =>
        queryGithubNodesInChunks<RepositoryPackageJsonNode>(
          dependencyIds,
          8,
          async (ids) => {
            const result = await queryGithubWithRetry(
              () =>
                client.query<{
                  nodes: Array<RepositoryPackageJsonNode | null>;
                }>({
                  query: PACKAGE_JSON_QUERY,
                  variables: { ids },
                  fetchPolicy: "no-cache"
                }),
              3
            );
            return result.data?.nodes ?? [];
          }
        ),
      []
    )
  ]);

  const npmById = await fetchNpmInstallCountsByRepoId(
    buildPackageNameByRepoId(packageJsonNodes)
  );

  const byId: ProjectStatsById = {};
  const ensure = (id: string): ProjectStatPatch => {
    const existing = byId[id];
    if (existing) {
      return existing;
    }
    const created: ProjectStatPatch = {};
    byId[id] = created;
    return created;
  };

  for (const node of countNodes) {
    if (!node?.id) {
      continue;
    }
    const patch = ensure(node.id);
    const totalCount = node.defaultBranchRef?.target?.history?.totalCount;
    if (typeof totalCount === "number") {
      patch.commitTotalCount = totalCount;
    }
    const releaseCount = node.releases?.totalCount ?? 0;
    if (releaseCount > 0) {
      patch.releaseCount = releaseCount;
    }
  }

  for (const [id, downloadCount] of Array.from(downloadById.entries())) {
    ensure(id).downloadCount = downloadCount;
  }
  for (const [id, npmInstallCount] of Array.from(npmById.entries())) {
    ensure(id).npmInstallCount = npmInstallCount;
  }

  return byId;
}

export function resolveEnrichmentIds(
  pinnedItems: GitHubRepository[],
  repositories: GitHubRepository[]
): {
  displayedIds: string[];
  dependencyIds: string[];
} {
  return {
    displayedIds: collectDisplayedRepoIds(pinnedItems, repositories),
    dependencyIds: collectDependencyRepoIds(repositories)
  };
}
