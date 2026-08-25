import React, { useState, useMemo, useEffect } from "react";
import Head from "next/head";
import { LayoutGroup, motion } from "framer-motion";
import { staggerContainer } from "../components/animations/pageAnimations";

import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";

import {
  isGitHubRepository,
  type GitHubUserProfile,
  type PinnedRepository
} from "../types/github";
import ProjectCategorySwitcher from "../components/ProjectCategorySwitcher";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import {
  PROJECT_CATEGORIES,
  excludeTemplateRepos,
  getProjectsForCategory,
  type ProjectCategoryId
} from "../lib/projectCategories";
import { queryGithubWithRetry } from "../lib/githubQuery";

interface ProjectsProps {
  pinnedItems: PinnedRepository[];
  repositories: PinnedRepository[];
}

const Projects: React.FC<ProjectsProps> = ({ pinnedItems, repositories }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategoryId>("pinned");
  const [loadedCount, setLoadedCount] = useState(3);
  const [selectedProject, setSelectedProject] = useState<PinnedRepository | null>(
    null
  );

  const categoryProjects = useMemo(
    () => getProjectsForCategory(activeCategory, pinnedItems, repositories),
    [activeCategory, pinnedItems, repositories]
  );

  const visibleProjects = useMemo(() => {
    return categoryProjects.slice(0, loadedCount);
  }, [categoryProjects, loadedCount]);

  const emptyMessage = useMemo(() => {
    const category = PROJECT_CATEGORIES.find((item) => item.id === activeCategory);
    return category?.emptyMessage ?? "No projects found.";
  }, [activeCategory]);

  useEffect(() => {
    if (loadedCount < categoryProjects.length) {
      const timer = setTimeout(() => {
        setLoadedCount((prev) => Math.min(prev + 2, categoryProjects.length));
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [loadedCount, categoryProjects.length]);

  const handleCategoryChange = (category: ProjectCategoryId) => {
    setSelectedProject(null);
    setActiveCategory(category);
    setLoadedCount(3);
  };

  return (
    <>
      <Head>
        <title>
          Projects - Nikos Pountzas Portfolio | GitHub Repositories & Open Source Work
        </title>
        <meta
          name="description"
          content="Explore Nikos Pountzas's portfolio projects - full-stack web applications, open source contributions, and development work showcased on GitHub."
        />
        <meta
          name="keywords"
          content="Nikos Pountzas, portfolio projects, GitHub repositories, web development projects, React applications, open source"
        />
        <meta property="og:title" content="Projects - Nikos Pountzas Portfolio" />
        <meta
          property="og:description"
          content="Full-stack web development projects and open source contributions by Nikos Pountzas."
        />
        <meta
          property="og:url"
          content="https://pountzas-portfolio.vercel.app/projects"
        />
        <meta name="twitter:title" content="Projects - Nikos Pountzas Portfolio" />
        <meta
          name="twitter:description"
          content="Explore my web development projects and GitHub repositories."
        />
        <link rel="canonical" href="https://pountzas-portfolio.vercel.app/projects" />
      </Head>
      <LayoutGroup>
        <motion.section
          className="flex flex-col items-center bg-gradient-to-b from-primary to-secondary overflow-y-auto h-screen scrollbar-hide"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          exit="exit">
          <div className="sticky top-0 z-10 w-full px-4 pt-4 pb-2 bg-gradient-to-b from-primary via-primary to-transparent">
            <ProjectCategorySwitcher
              activeCategory={activeCategory}
              onChange={handleCategoryChange}
            />
          </div>

          {categoryProjects.length === 0 ? (
            <motion.div
              className="flex items-center justify-center flex-1 px-6 py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              role="tabpanel"
              id={`project-panel-${activeCategory}`}
              aria-labelledby={`project-tab-${activeCategory}`}>
              <p className="text-sm text-center text-textTertiary md:text-base">
                {emptyMessage}
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="grid pt-4 gap-6 md:grid-cols-2 justify-items-center items-stretch"
              variants={staggerContainer}
              role="tabpanel"
              id={`project-panel-${activeCategory}`}
              aria-labelledby={`project-tab-${activeCategory}`}>
              {visibleProjects.map((item, index) => (
                <ProjectCard
                  key={`${activeCategory}-${item.id}`}
                  item={item}
                  index={index}
                  isSelected={selectedProject?.id === item.id}
                  onOpen={setSelectedProject}
                  onClose={() => setSelectedProject(null)}
                />
              ))}

              {loadedCount < categoryProjects.length && (
                <motion.div
                  className="flex justify-center items-center py-8 md:col-span-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}>
                  <div className="flex items-center space-x-2 text-textTertiary">
                    <div className="w-4 h-4 border-2 border-textPrimary border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm">Loading more projects...</span>
                  </div>
                </motion.div>
              )}

              <div className="h-20 md:col-span-2"></div>
            </motion.div>
          )}
        </motion.section>
        <ProjectModal
          isOpen={selectedProject !== null}
          onClose={() => setSelectedProject(null)}
        />
      </LayoutGroup>
    </>
  );
};

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
              defaultBranchRef {
                target {
                  ... on Commit {
                    id
                    history {
                      totalCount
                    }
                  }
                }
              }
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

export async function getStaticProps() {
  const httpLink = new HttpLink({
    uri: "https://api.github.com/graphql"
  });

  const token = process.env.GITHUB_ACCESS_TOKEN;

  const authLink = new SetContextLink((prevContext, operation) => ({
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }));

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  const [pinnedResult, repositoryResult] = await Promise.all([
    queryGithubWithRetry(() =>
      client.query<{ user: Pick<GitHubUserProfile, "id" | "pinnedItems"> }>({
        query: PINNED_PROJECTS_QUERY
      })
    ),
    queryGithubWithRetry(() =>
      client.query<{ user: Pick<GitHubUserProfile, "repositories"> }>({
        query: REPOSITORY_LIST_QUERY
      })
    )
  ]);

  const pinnedUser = pinnedResult.data?.user;
  const repositoryUser = repositoryResult.data?.user;

  if (!pinnedUser || !repositoryUser) {
    throw new Error("Failed to fetch GitHub data");
  }

  const pinned = excludeTemplateRepos(
    pinnedUser.pinnedItems.edges.map((edge) => edge.node).filter(isGitHubRepository)
  );
  const repositories = excludeTemplateRepos(
    repositoryUser.repositories.edges.map((edge) => edge.node)
  );

  return {
    props: {
      pinnedItems: pinned,
      repositories
    },
    revalidate: 60
  };
}

export default Projects;
