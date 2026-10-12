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
import {
  CLOSE_DIALOG_ARIA_LABEL,
  COLLAPSED_CHIP_BG_CLASS_NAME,
  COLLAPSED_CHIP_TEXT_CLASS_NAME,
  GITHUB_LINK_ARIA_LABEL,
  LIVE_DEMO_LINK_ARIA_LABEL,
  TOUCH_TARGET_CLASS_NAME,
  handleProjectDialogKeyDown,
  openDetailsAriaLabel,
  resolveFocusRestoreTarget
} from "./projectCardA11y.mjs";

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
        alt=""
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
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 pb-4">
        {showGitHub && (
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={item.url}
            aria-label={GITHUB_LINK_ARIA_LABEL}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white bg-tertiary hover:bg-textTertiary ${TOUCH_TARGET_CLASS_NAME}`}
            onClick={stopCardOpen}
            onPointerDown={stopCardOpen}>
            <AiFillGithub aria-hidden="true" />
            GitHub
          </Link>
        )}
        {homepageUrl && (
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={homepageUrl}
            aria-label={LIVE_DEMO_LINK_ARIA_LABEL}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 ${TOUCH_TARGET_CLASS_NAME}`}
            onClick={stopCardOpen}
            onPointerDown={stopCardOpen}>
            <GrDeploy aria-hidden="true" />
            Live demo
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 pb-3">
      {showGitHub && (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={item.url}
          aria-label={GITHUB_LINK_ARIA_LABEL}
          className={`inline-flex items-center justify-center m-1 font-semibold rounded-full ${COLLAPSED_CHIP_TEXT_CLASS_NAME} ${COLLAPSED_CHIP_BG_CLASS_NAME} hover:bg-tertiary ${TOUCH_TARGET_CLASS_NAME}`}
          onClick={stopCardOpen}
          onPointerDown={stopCardOpen}>
          <AiFillGithub aria-hidden="true" className="text-lg" />
        </Link>
      )}
      {homepageUrl && (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={homepageUrl}
          aria-label={LIVE_DEMO_LINK_ARIA_LABEL}
          className={`inline-flex items-center justify-center m-1 font-semibold rounded-full ${COLLAPSED_CHIP_TEXT_CLASS_NAME} ${COLLAPSED_CHIP_BG_CLASS_NAME} hover:bg-tertiary ${TOUCH_TARGET_CLASS_NAME}`}
          onClick={stopCardOpen}
          onPointerDown={stopCardOpen}>
          <GrDeploy aria-hidden="true" className="text-lg" />
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
          ? "relative z-10 flex flex-wrap justify-between gap-3 rounded-b-lg bg-secondary p-3 px-5 text-sm"
          : "relative z-10 flex flex-wrap justify-between gap-2 rounded-b-lg bg-secondary p-1.5 px-3 text-sm"
      }>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 whitespace-normal">
        {expanded ? (
          <>
            <span className="inline-flex items-center gap-1">
              <AiOutlineFork aria-hidden="true" /> {item.forkCount}
            </span>
            <span className="inline-flex items-center gap-1">
              <AiOutlineStar aria-hidden="true" /> {item.stargazerCount}
            </span>
            <span className="inline-flex items-center gap-1">
              <AiFillEye aria-hidden="true" /> {item.watchers.totalCount}
            </span>
          </>
        ) : (
          <>
            <AiOutlineFork aria-hidden="true" />
            {item.forkCount}
            <AiOutlineStar aria-hidden="true" />
            {item.stargazerCount}
            <AiFillEye aria-hidden="true" />
            {item.watchers.totalCount}
          </>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {expanded ? (
          <span>Contributors:</span>
        ) : (
          <>
            <p className="hidden md:inline-block">Contributors: </p>
            <BsPeopleFill className="md:hidden" aria-hidden="true" />
          </>
        )}
        {contributors.map((user) => (
          <div className="relative" key={user.node.id}>
            <Image
              className="rounded-full"
              src={user.node.avatarUrl}
              width={avatarSize}
              height={avatarSize}
              alt={user.node.name || "Contributor"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const ProjectCard = memo(function ProjectCard({
  item,
  index,
  isSelected,
  onOpen,
  onClose
}: ProjectCardProps) {
  const articleRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const titleId = `project-title-${item.id}`;

  useEffect(() => {
    if (!isSelected) {
      return;
    }

    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      handleProjectDialogKeyDown(event, {
        container: articleRef.current,
        onClose,
        getActiveElement: () => document.activeElement
      });
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      const restoreTarget = resolveFocusRestoreTarget(
        previouslyFocusedRef.current,
        openButtonRef.current
      );
      if (restoreTarget && typeof restoreTarget.focus === "function") {
        restoreTarget.focus();
      }
    };
  }, [isSelected, onClose]);

  return (
    <div className="relative h-full w-full max-w-[17rem] md:max-w-xs">
      {isSelected && (
        <div
          className="invisible pointer-events-none flex h-full flex-col justify-between border-2 rounded-xl"
          aria-hidden>
          <div className="p-1.5 mb-2 text-lg">&nbsp;</div>
          <div className="mx-3 aspect-[480/315]" />
          <p className="py-1.5 mx-3 text-sm whitespace-normal">{item.description}</p>
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
            : "relative flex h-full flex-col border-2 text-textPrimary border-borderSecondary rounded-xl bg-quaternary w-full"
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
        role={isSelected ? "dialog" : undefined}
        aria-modal={isSelected || undefined}
        aria-labelledby={titleId}>
        {!isSelected && (
          <button
            ref={openButtonRef}
            type="button"
            className="absolute inset-0 z-0 rounded-xl"
            aria-label={openDetailsAriaLabel(item.name)}
            onClick={() => {
              previouslyFocusedRef.current = openButtonRef.current;
              onOpen(item);
            }}
          />
        )}

        {isSelected && (
          <button
            ref={closeButtonRef}
            type="button"
            className={`absolute top-3 right-3 z-10 text-textTertiary hover:text-textPrimary text-xl inline-flex items-center justify-center ${TOUCH_TARGET_CLASS_NAME}`}
            aria-label={CLOSE_DIALOG_ARIA_LABEL}
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}>
            ✕
          </button>
        )}

        <h2
          id={titleId}
          className={
            isSelected
              ? "relative z-10 font-semibold text-center rounded-t-lg bg-secondary p-3 pr-10 text-2xl break-words"
              : "relative z-10 font-semibold text-center rounded-t-lg bg-secondary p-1.5 mb-2 text-lg pointer-events-none break-words"
          }>
          {item.name}
        </h2>

        <div className={isSelected ? "relative z-10" : "relative z-0 pointer-events-none"}>
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
                ? "py-4 mx-5 text-base leading-relaxed text-textTertiary whitespace-normal"
                : "py-1.5 mx-3 text-sm whitespace-normal min-h-[4.5rem]"
            }>
            {item.description ||
              (isSelected
                ? "No description provided for this repository."
                : null)}
          </p>

          <ProjectTopics item={item} expanded={isSelected} />
        </div>

        <div className={isSelected ? "relative z-10" : "relative z-10 mt-auto"}>
          <ProjectLinks item={item} expanded={isSelected} />
          <ProjectFooter item={item} expanded={isSelected} />
        </div>
      </motion.article>
    </div>
  );
});

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
