import React, { useState, useMemo, useEffect } from "react";
import Head from "next/head";
import { LayoutGroup, motion } from "framer-motion";
import { staggerContainer } from "../components/animations/pageAnimations";

import type { PinnedRepository } from "../types/github";
import ProjectCategorySwitcher from "../components/ProjectCategorySwitcher";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import {
  PROJECT_CATEGORIES,
  getProjectsForCategory,
  type ProjectCategoryId
} from "../lib/projectCategories";
import {
  applyProjectStatsById,
  type ProjectStatsById
} from "../lib/githubProjectFetch";
import { getCachedLightProjectLists } from "../lib/githubProjectCache";

interface ProjectsProps {
  pinnedItems: PinnedRepository[];
  repositories: PinnedRepository[];
}

const Projects: React.FC<ProjectsProps> = ({
  pinnedItems: initialPinned,
  repositories: initialRepositories
}) => {
  const [pinnedItems, setPinnedItems] = useState(initialPinned);
  const [repositories, setRepositories] = useState(initialRepositories);
  const [activeCategory, setActiveCategory] = useState<ProjectCategoryId>("pinned");
  const [loadedCount, setLoadedCount] = useState(3);
  const [selectedProject, setSelectedProject] = useState<PinnedRepository | null>(
    null
  );

  useEffect(() => {
    setPinnedItems(initialPinned);
    setRepositories(initialRepositories);
  }, [initialPinned, initialRepositories]);

  useEffect(() => {
    let cancelled = false;

    async function enrichStats() {
      try {
        const response = await fetch("/api/project-stats");
        if (!response.ok) {
          return;
        }
        const data = (await response.json()) as { byId?: ProjectStatsById };
        if (cancelled || !data.byId) {
          return;
        }

        setPinnedItems((prev) => applyProjectStatsById(prev, data.byId!));
        setRepositories((prev) => applyProjectStatsById(prev, data.byId!));
        setSelectedProject((prev) =>
          prev ? applyProjectStatsById([prev], data.byId!)[0] ?? prev : prev
        );
      } catch (error) {
        console.warn("[Projects] stats enrichment failed:", error);
      }
    }

    void enrichStats();
    return () => {
      cancelled = true;
    };
  }, []);

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

export async function getStaticProps() {
  const { pinnedItems, repositories } = await getCachedLightProjectLists();

  return {
    props: {
      pinnedItems,
      repositories
    },
    revalidate: 60
  };
}

export default Projects;
