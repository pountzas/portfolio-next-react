import React, { useState, Activity, useMemo, memo } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  staggerContainer,
  createStaggeredFlip
} from "../components/animations/pageAnimations";

import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";

import type { PinnedRepository, GitHubApiResponse } from "../types/github";

import { AiOutlineStar, AiOutlineFork, AiFillEye, AiFillGithub } from "react-icons/ai";
import { GrDeploy } from "react-icons/gr";
import { BsPeopleFill } from "react-icons/bs";

interface ProjectsProps {
  pinnedItems: PinnedRepository[];
}

interface ProjectCardProps {
  item: PinnedRepository;
  index: number;
}

// Memoized Project Card Component for better performance
const ProjectCard = memo<ProjectCardProps>(({ item, index }) => {
  // Memoize expensive computations
  const contributors = useMemo(
    () => item.assignableUsers?.edges || [],
    [item.assignableUsers]
  );
  const topics = useMemo(
    () => item.repositoryTopics?.edges || [],
    [item.repositoryTopics]
  );

  return (
    <motion.div
      className="flex flex-col justify-between max-w-xs border-2 text-textPrimary border-borderSecondary rounded-xl bg-quaternary md:max-w-md"
      variants={createStaggeredFlip(0.2, 0.15)(index)}
      whileHover={{
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        transition: { duration: 0.3 }
      }}>
      <h1 className="p-2 mb-3 text-xl font-semibold text-center rounded-t-lg bg-secondary">
        {item.name}
      </h1>
      <div className="relative mx-5">
        <Image
          className="rounded-lg"
          src={item.openGraphImageUrl}
          width={640}
          height={420}
          alt={item.name}
          priority={index < 2}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
        />
        <div className="absolute top-auto flex items-center justify-center pb-2 inset-1">
          <Activity mode={item.object ? "visible" : "hidden"}>
            <p className="flex px-3 py-1 m-1 text-xs font-bold text-gray-800 bg-teal-500 border rounded-full shadow-lg cursor-pointer border-cyan-600 hover:text-blue-900 md:text:md">
              <span className="pr-1">Commits: </span>
              {item.object?.history?.totalCount}
            </p>
          </Activity>

          <Activity mode={item.cloneCount ? "visible" : "hidden"}>
            <p className="flex px-3 py-1 m-1 text-xs font-bold text-gray-800 bg-teal-500 border rounded-full shadow-lg cursor-pointer border-cyan-600 hover:text-blue-900 md:text:md">
              <span className="pr-1">Cloned:</span>
              {item.cloneCount}
            </p>
          </Activity>

          <Activity mode={item.viewCount ? "visible" : "hidden"}>
            <p className="flex px-3 py-1 m-1 text-xs font-bold text-gray-800 bg-teal-500 border rounded-full shadow-lg cursor-pointer border-cyan-600 hover:text-blue-900 md:text:md">
              <span className="pr-1">Views:</span>
              {item.viewCount}
            </p>
          </Activity>
        </div>
      </div>
      <p className="py-2 mx-5">{item.description}</p>
      {/* tags */}
      <div className="flex flex-wrap justify-center pb-2 mx-5">
        {topics.map((tag) => (
          <span
            className="inline-block px-3 py-1 m-1 text-xs font-semibold text-blue-100 rounded-full cursor-pointer bg-tertiary"
            key={tag.node.id}>
            {tag.node.topic.name}
          </span>
        ))}
      </div>
      {/* Links */}
      <div className="flex items-center justify-center pb-3">
        <Link target={"_blank"} rel="noopener noreferrer" href={item.url} passHref>
          <div className="inline-block px-3 py-1 m-1 text-xl font-semibold rounded-full text-textSecondary bg-textTertiary hover:bg-tertiary">
            <AiFillGithub />
          </div>
        </Link>
        {item.homepageUrl && (
          <Link
            target={"_blank"}
            rel="noopener noreferrer"
            href={item.homepageUrl}
            passHref>
            <div className="inline-block px-3 py-1 m-1 text-xl font-semibold rounded-full text-textSecondary bg-textTertiary hover:bg-tertiary">
              <GrDeploy />
            </div>
          </Link>
        )}
      </div>
      {/* last section */}
      <div className="flex justify-between p-2 px-5 rounded-b-lg bg-secondary">
        <div className="flex items-center space-x-4 whitespace-normal">
          <AiOutlineFork />
          {item.forkCount}
          <AiOutlineStar />
          {item.stargazerCount}
          <AiFillEye />
          {item.watchers.totalCount}
        </div>
        <div className="flex items-center space-x-2">
          <p className="hidden md:inline-block">Contributors: </p>
          <BsPeopleFill className="md:hidden" />
          {contributors.map((user) => (
            <div className="relative group-hover:opacity-100" key={user.node.id}>
              <Image
                className="rounded-full"
                src={user.node.avatarUrl}
                width={25}
                height={25}
                alt={user.node.name || "Contributor"}
              />
              <span className="absolute inset-0 z-10 flex justify-center text-sm font-semibold text-gray-300 opacity-0 -top-6 hover:opacity-100 whitespace-nowrap">
                {user.node.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = "ProjectCard";

const Projects: React.FC<ProjectsProps> = ({ pinnedItems }) => {
  const [projects, setProjects] = useState<PinnedRepository[]>(pinnedItems);
  const [loadedCount, setLoadedCount] = useState(3); // Start with 3 projects

  // Memoize visible projects for performance
  const visibleProjects = useMemo(() => {
    return projects.slice(0, loadedCount);
  }, [projects, loadedCount]);

  // Load more projects progressively
  React.useEffect(() => {
    if (loadedCount < projects.length) {
      const timer = setTimeout(() => {
        setLoadedCount((prev) => Math.min(prev + 2, projects.length));
      }, 100); // Small delay to allow initial render to complete

      return () => clearTimeout(timer);
    }
  }, [loadedCount, projects.length]);

  // console.log(projects);

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
      <motion.section
        className="flex justify-center bg-gradient-to-b from-primary to-secondary overflow-y-auto h-screen scrollbar-hide"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        exit="exit">
        <motion.div
          className="grid gap-8 pt-6 md:grid-cols-2"
          variants={staggerContainer}>
          {visibleProjects.map((item, index) => (
            <ProjectCard key={item.id} item={item} index={index} />
          ))}

          {/* Loading indicator for additional projects */}
          {loadedCount < projects.length && (
            <motion.div
              className="flex justify-center items-center py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}>
              <div className="flex items-center space-x-2 text-textTertiary">
                <div className="w-4 h-4 border-2 border-textPrimary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Loading more projects...</span>
              </div>
            </motion.div>
          )}

          <div className="h-20"></div>
        </motion.div>
      </motion.section>
    </>
  );
};

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

  const { data } = await client.query<GitHubApiResponse>({
    query: gql`
      {
        user(login: "pountzas") {
          id
          pinnedItems(first: 6) {
            edges {
              node {
                ... on Repository {
                  id
                  name
                  forkCount
                  stargazerCount
                  openGraphImageUrl
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
                  repositoryTopics(first: 7) {
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
                  object(expression: "main") {
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
    `
  });

  if (!data) {
    throw new Error("Failed to fetch GitHub data");
  }

  const { user } = data;
  const pinned = user.pinnedItems.edges.map(
    ({ node }: { node: PinnedRepository }) => node
  );

  return {
    props: {
      pinnedItems: pinned
    },
    revalidate: 60
  };
}

export default Projects;
