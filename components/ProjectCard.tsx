import {
  memo,
  useEffect,
  useMemo,
  useRef,
  Activity,
  type MouseEvent,
  type PointerEvent
} from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { createStaggeredFlip } from "./animations/pageAnimations";
import { getProjectImageSrc } from "../lib/projectImage";
import { projectLayoutId } from "../lib/projectLayout";
import type { PinnedRepository } from "../types/github";
import { AiOutlineStar, AiOutlineFork, AiFillEye, AiFillGithub } from "react-icons/ai";
import { GrDeploy } from "react-icons/gr";
import { BsPeopleFill } from "react-icons/bs";

const PROJECT_IMAGE_BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z";

const LAYOUT_TRANSITION = {
  duration: 0.35,
  ease: [0.25, 0.46, 0.45, 0.94] as const
};

interface ProjectCardProps {
  item: PinnedRepository;
  index: number;
  isSelected: boolean;
  onOpen: (item: PinnedRepository) => void;
  onClose: () => void;
}

function stopCardOpen(event: MouseEvent | PointerEvent) {
  event.stopPropagation();
}

function ProjectImage({
  item,
  index,
  width,
  height,
  showBadges,
  badgeSize
}: {
  item: PinnedRepository;
  index: number;
  width: number;
  height: number;
  showBadges: boolean;
  badgeSize: "sm" | "md";
}) {
  const commitHistory =
    item.object?.history ?? item.defaultBranchRef?.target?.history;
  const hasReleases = (item.releaseCount ?? 0) > 0;
  const hasDownloads = (item.downloadCount ?? 0) > 0;
  const hasNpmInstalls = (item.npmInstallCount ?? 0) > 0;
  const badgeClass =
    badgeSize === "md"
      ? "flex m-1 font-bold text-gray-800 bg-teal-500 border rounded-full shadow-lg border-cyan-600 px-3 py-1 text-xs"
      : "flex m-1 font-bold text-gray-800 bg-teal-500 border rounded-full shadow-lg border-cyan-600 px-2 py-0.5 text-[10px]";

  return (
    <div className={badgeSize === "md" ? "relative mx-5 mt-4" : "relative mx-3"}>
      <Image
        className="rounded-lg w-full h-auto"
        src={getProjectImageSrc(item)}
        width={width}
        height={height}
        alt={item.name}
        priority={index < 2}
        placeholder="blur"
        blurDataURL={PROJECT_IMAGE_BLUR}
      />
      {showBadges && (
        <div
          className={
            badgeSize === "md"
              ? "absolute bottom-2 left-0 right-0 flex flex-wrap items-center justify-center"
              : "absolute top-auto flex flex-wrap items-center justify-center pb-2 inset-1"
          }>
          <Activity mode={commitHistory ? "visible" : "hidden"}>
            <p className={badgeClass}>
              <span className="pr-1">Commits:</span>
              {commitHistory?.totalCount}
            </p>
          </Activity>
          <Activity mode={hasReleases ? "visible" : "hidden"}>
            <p className={badgeClass}>
              <span className="pr-1">Releases:</span>
              {item.releaseCount}
            </p>
          </Activity>
          <Activity mode={hasDownloads ? "visible" : "hidden"}>
            <p className={badgeClass}>
              <span className="pr-1">Downloads:</span>
              {item.downloadCount}
            </p>
          </Activity>
          <Activity mode={hasNpmInstalls ? "visible" : "hidden"}>
            <p
              className={badgeClass}
              title="npm downloads in the last 12 months">
              <span className="pr-1">npm:</span>
              {item.npmInstallCount?.toLocaleString()}
            </p>
          </Activity>
          <Activity mode={item.cloneCount ? "visible" : "hidden"}>
            <p className={badgeClass}>
              <span className="pr-1">Cloned:</span>
              {item.cloneCount}
            </p>
          </Activity>
          <Activity mode={item.viewCount ? "visible" : "hidden"}>
            <p className={badgeClass}>
              <span className="pr-1">Views:</span>
              {item.viewCount}
            </p>
          </Activity>
        </div>
      )}
    </div>
  );
}

function ProjectTopics({
  item,
  expanded
}: {
  item: PinnedRepository;
  expanded: boolean;
}) {
  const topics = useMemo(
    () => item.repositoryTopics?.edges || [],
    [item.repositoryTopics]
  );

  return (
    <div
      className={
        expanded
          ? "flex flex-wrap justify-center pb-3 mx-5"
          : "flex flex-wrap content-start justify-center flex-1 pb-2 mx-3"
      }>
      {topics.map((tag) => (
        <span
          className={
            expanded
              ? "inline-block m-1 font-semibold text-blue-100 rounded-full bg-tertiary px-3 py-1 text-xs"
              : "inline-block m-1 font-semibold text-blue-100 rounded-full bg-tertiary px-2 py-0.5 text-[10px]"
          }
          key={tag.node.id}>
          {tag.node.topic.name}
        </span>
      ))}
    </div>
  );
}

function ProjectLinks({
  item,
  expanded
}: {
  item: PinnedRepository;
  expanded: boolean;
}) {
  const showGitHub = !item.isPrivate;
  const homepageUrl = item.homepageUrl;

  if (!showGitHub && !homepageUrl) {
    return null;
  }

  if (expanded) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-3 pb-4">
        {showGitHub && (
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={item.url}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white bg-tertiary hover:bg-textTertiary"
            onClick={stopCardOpen}
            onPointerDown={stopCardOpen}>
            <AiFillGithub />
            GitHub
          </Link>
        )}
        {homepageUrl && (
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={homepageUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700"
            onClick={stopCardOpen}
            onPointerDown={stopCardOpen}>
            <GrDeploy />
            Live demo
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center pb-3">
      {showGitHub && (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={item.url}
          passHref
          onClick={stopCardOpen}
          onPointerDown={stopCardOpen}>
          <div className="inline-block m-1 font-semibold rounded-full text-textSecondary bg-textTertiary hover:bg-tertiary px-2 py-0.5 text-lg">
            <AiFillGithub />
          </div>
        </Link>
      )}
      {homepageUrl && (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={homepageUrl}
          passHref
          onClick={stopCardOpen}
          onPointerDown={stopCardOpen}>
          <div className="inline-block m-1 font-semibold rounded-full text-textSecondary bg-textTertiary hover:bg-tertiary px-2 py-0.5 text-lg">
            <GrDeploy />
          </div>
        </Link>
      )}
    </div>
  );
}

function ProjectFooter({
  item,
  expanded
}: {
  item: PinnedRepository;
  expanded: boolean;
}) {
  const contributors = useMemo(
    () => item.assignableUsers?.edges || [],
    [item.assignableUsers]
  );
  const avatarSize = expanded ? 28 : 20;

  return (
    <div
      className={
        expanded
          ? "flex flex-wrap justify-between gap-3 rounded-b-lg bg-secondary p-3 px-5 text-sm"
          : "flex justify-between rounded-b-lg bg-secondary p-1.5 px-3 text-sm"
      }>
      <div className="flex items-center space-x-4 whitespace-normal">
        {expanded ? (
          <>
            <span className="inline-flex items-center gap-1">
              <AiOutlineFork /> {item.forkCount}
            </span>
            <span className="inline-flex items-center gap-1">
              <AiOutlineStar /> {item.stargazerCount}
            </span>
            <span className="inline-flex items-center gap-1">
              <AiFillEye /> {item.watchers.totalCount}
            </span>
          </>
        ) : (
          <>
            <AiOutlineFork />
            {item.forkCount}
            <AiOutlineStar />
            {item.stargazerCount}
            <AiFillEye />
            {item.watchers.totalCount}
          </>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {expanded ? (
          <span>Contributors:</span>
        ) : (
          <>
            <p className="hidden md:inline-block">Contributors: </p>
            <BsPeopleFill className="md:hidden" />
          </>
        )}
        {contributors.map((user) => (
          <div
            className="relative"
            key={user.node.id}
            title={expanded ? user.node.name || undefined : undefined}>
            <Image
              className="rounded-full"
              src={user.node.avatarUrl}
              width={avatarSize}
              height={avatarSize}
              alt={user.node.name || "Contributor"}
            />
            {!expanded && (
              <span className="absolute inset-0 z-10 flex justify-center text-sm font-semibold text-gray-300 opacity-0 -top-6 hover:opacity-100 whitespace-nowrap">
                {user.node.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const ProjectCard = memo<ProjectCardProps>(
  ({ item, index, isSelected, onOpen, onClose }) => {
    const articleRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (isSelected) {
        articleRef.current?.focus();
      }
    }, [isSelected]);

    const openOnActivate = () => {
      if (!isSelected) {
        onOpen(item);
      }
    };

    return (
      <div className="relative h-full w-full max-w-[17rem] md:max-w-xs">
        {isSelected && (
          <div
            className="invisible pointer-events-none flex h-full flex-col justify-between border-2 rounded-xl"
            aria-hidden>
            <div className="p-1.5 mb-2 text-lg">&nbsp;</div>
            <div className="mx-3 aspect-[480/315]" />
            <p className="py-1.5 mx-3 text-sm line-clamp-3">{item.description}</p>
            <div className="pb-2 mx-3 h-8" />
            <div className="pb-3 h-10" />
            <div className="p-1.5 h-10" />
          </div>
        )}

        <motion.article
          ref={articleRef}
          layout
          layoutId={projectLayoutId(item.id)}
          transition={{ layout: LAYOUT_TRANSITION }}
          className={
            isSelected
              ? "fixed z-[120] inset-0 m-auto h-fit w-[min(92vw,42rem)] max-h-[85vh] overflow-y-auto flex flex-col border-2 text-textPrimary border-borderSecondary rounded-xl bg-quaternary shadow-2xl scrollbar-hide cursor-default"
              : "relative flex h-full flex-col border-2 text-textPrimary border-borderSecondary rounded-xl bg-quaternary w-full cursor-pointer"
          }
          variants={createStaggeredFlip(0.2, 0.15)(index)}
          whileHover={
            isSelected
              ? undefined
              : {
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  transition: { duration: 0.3 }
                }
          }
          role={isSelected ? "dialog" : "button"}
          aria-modal={isSelected || undefined}
          aria-labelledby={`project-title-${item.id}`}
          tabIndex={0}
          aria-label={
            isSelected ? undefined : `Open details for ${item.name}`
          }
          onClick={openOnActivate}
          onKeyDown={(event) => {
            if (isSelected && event.key === "Escape") {
              event.preventDefault();
              onClose();
              return;
            }
            if (!isSelected && (event.key === "Enter" || event.key === " ")) {
              event.preventDefault();
              openOnActivate();
            }
          }}>
          {isSelected && (
            <button
              type="button"
              className="absolute top-3 right-3 z-10 text-textTertiary hover:text-textPrimary text-xl px-2"
              aria-label="Close project details"
              onClick={(event) => {
                event.stopPropagation();
                onClose();
              }}>
              ✕
            </button>
          )}

          <h2
            id={`project-title-${item.id}`}
            className={
              isSelected
                ? "font-semibold text-center rounded-t-lg bg-secondary p-3 pr-10 text-2xl"
                : "font-semibold text-center rounded-t-lg bg-secondary p-1.5 mb-2 text-lg"
            }>
            {item.name}
          </h2>

          <ProjectImage
            item={item}
            index={index}
            width={isSelected ? 800 : 480}
            height={isSelected ? 420 : 315}
            showBadges
            badgeSize={isSelected ? "md" : "sm"}
          />

          <p
            className={
              isSelected
                ? "py-4 mx-5 text-base leading-relaxed text-textTertiary"
                : "py-1.5 mx-3 text-sm line-clamp-3 min-h-[4.5rem]"
            }>
            {item.description ||
              (isSelected
                ? "No description provided for this repository."
                : null)}
          </p>

          <ProjectTopics item={item} expanded={isSelected} />
          <div className={isSelected ? undefined : "mt-auto"}>
            <ProjectLinks item={item} expanded={isSelected} />
            <ProjectFooter item={item} expanded={isSelected} />
          </div>
        </motion.article>
      </div>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
