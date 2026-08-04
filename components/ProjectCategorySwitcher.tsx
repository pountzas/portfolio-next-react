import React from "react";
import {
  PROJECT_CATEGORIES,
  type ProjectCategoryId
} from "../lib/projectCategories";

interface ProjectCategorySwitcherProps {
  activeCategory: ProjectCategoryId;
  onChange: (category: ProjectCategoryId) => void;
}

const ProjectCategorySwitcher: React.FC<ProjectCategorySwitcherProps> = ({
  activeCategory,
  onChange
}) => {
  return (
    <div
      className="flex flex-wrap justify-center gap-1 p-1 mx-auto border rounded-full border-borderSecondary bg-tertiary"
      role="tablist"
      aria-label="Project categories">
      {PROJECT_CATEGORIES.map((category) => {
        const isActive = activeCategory === category.id;

        return (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            id={`project-tab-${category.id}`}
            className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors md:px-4 md:text-sm ${
              isActive
                ? "bg-quaternary text-textPrimary"
                : "text-textTertiary hover:text-textPrimary"
            }`}
            onClick={() => onChange(category.id)}>
            {category.label}
          </button>
        );
      })}
    </div>
  );
};

export default ProjectCategorySwitcher;
