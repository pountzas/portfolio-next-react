import React, { useRef } from "react";
import {
  PROJECT_CATEGORIES,
  type ProjectCategoryId
} from "../lib/projectCategories";

interface ProjectCategorySwitcherProps {
  activeCategory: ProjectCategoryId;
  onChange: (category: ProjectCategoryId) => void;
}

type TabListKey = "ArrowLeft" | "ArrowRight" | "Home" | "End";

function isTabListKey(key: string): key is TabListKey {
  return (
    key === "ArrowLeft" ||
    key === "ArrowRight" ||
    key === "Home" ||
    key === "End"
  );
}

function nextCategoryIndex(
  key: TabListKey,
  index: number,
  lastIndex: number
): number {
  switch (key) {
    case "ArrowRight":
      return index === lastIndex ? 0 : index + 1;
    case "ArrowLeft":
      return index === 0 ? lastIndex : index - 1;
    case "Home":
      return 0;
    case "End":
      return lastIndex;
    default: {
      const _exhaustive: never = key;
      return _exhaustive;
    }
  }
}

const ProjectCategorySwitcher: React.FC<ProjectCategorySwitcherProps> = ({
  activeCategory,
  onChange
}) => {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusAndSelect = (index: number) => {
    const category = PROJECT_CATEGORIES[index];
    if (!category) {
      return;
    }

    onChange(category.id);
    tabRefs.current[index]?.focus();
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (!isTabListKey(event.key)) {
      return;
    }

    event.preventDefault();
    focusAndSelect(
      nextCategoryIndex(event.key, index, PROJECT_CATEGORIES.length - 1)
    );
  };

  return (
    <div
      className="flex flex-wrap justify-center gap-1 p-1 mx-auto border rounded-full border-borderSecondary bg-tertiary"
      role="tablist"
      aria-label="Project categories">
      {PROJECT_CATEGORIES.map((category, index) => {
        const isActive = activeCategory === category.id;

        return (
          <button
            key={category.id}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`project-tab-${category.id}`}
            aria-selected={isActive}
            aria-controls={`project-panel-${category.id}`}
            tabIndex={isActive ? 0 : -1}
            className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors md:px-4 md:text-sm ${
              isActive
                ? "bg-quaternary text-textPrimary"
                : "text-textTertiary hover:text-textPrimary"
            }`}
            onClick={() => onChange(category.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}>
            {category.label}
          </button>
        );
      })}
    </div>
  );
};

export default ProjectCategorySwitcher;
