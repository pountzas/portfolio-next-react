import React from 'react';
import { motion } from 'framer-motion';
import {
  staggerContainer,
  createStaggeredFlip,
  flipFromLeft,
  flipFromTop,
  flipFromRight,
  flipFromBottom
} from './animations/pageAnimations';
import SkillTemplate from './SkillTemplate';
import type { BaseSkillItem } from '../types';

interface SkillSectionProps {
  title: string;
  skills: BaseSkillItem[];
  sectionIndex: number;
  gridCols?: string;
  entryAnimation?: 'left' | 'top' | 'right' | 'bottom';
  isAnyModalOpen: boolean;
  setIsAnyModalOpen: (isOpen: boolean) => void;
}

const SkillSection: React.FC<SkillSectionProps> = ({
  title,
  skills,
  sectionIndex,
  gridCols = 'grid-cols-2',
  entryAnimation = 'left',
  isAnyModalOpen,
  setIsAnyModalOpen,
}) => {
  // Animation variants based on entry direction
  const getSectionVariant = () => {
    switch (entryAnimation) {
      case 'left': return flipFromLeft;
      case 'top': return flipFromTop;
      case 'right': return flipFromRight;
      case 'bottom': return flipFromBottom;
      default: return flipFromLeft;
    }
  };

  const getCardAnimation = (index: number) => {
    const baseDelay = sectionIndex * 0.1 + 0.3; // Base delay per section
    const staggerDelay = gridCols.includes('md:grid-cols-3') ? 0.15 : 0.2; // Faster for 3-column grids

    switch (entryAnimation) {
      case 'left':
        return {
          initial: { opacity: 0, x: -200, rotateY: -45 },
          animate: { opacity: 1, x: 0, rotateY: 0 },
          transition: {
            duration: 0.6,
            delay: baseDelay + index * staggerDelay,
            ease: [0.25, 0.46, 0.45, 0.94] as const
          }
        };
      case 'top':
        return {
          initial: { opacity: 0, y: -200, rotateX: -45 },
          animate: { opacity: 1, y: 0, rotateX: 0 },
          transition: {
            duration: 0.6,
            delay: baseDelay + index * staggerDelay,
            ease: [0.25, 0.46, 0.45, 0.94] as const
          }
        };
      case 'right':
        return {
          initial: { opacity: 0, x: 200, rotateY: 45 },
          animate: { opacity: 1, x: 0, rotateY: 0 },
          transition: {
            duration: 0.6,
            delay: baseDelay + index * staggerDelay,
            ease: [0.25, 0.46, 0.45, 0.94] as const
          }
        };
      case 'bottom':
        return {
          initial: { opacity: 0, y: 200, rotateX: 45 },
          animate: { opacity: 1, y: 0, rotateX: 0 },
          transition: {
            duration: 0.6,
            delay: baseDelay + index * staggerDelay,
            ease: [0.25, 0.46, 0.45, 0.94] as const
          }
        };
      default:
        return {
          initial: { opacity: 0, x: -200, rotateY: -45 },
          animate: { opacity: 1, x: 0, rotateY: 0 },
          transition: {
            duration: 0.6,
            delay: baseDelay + index * staggerDelay,
            ease: [0.25, 0.46, 0.45, 0.94] as const
          }
        };
    }
  };

  return (
    <motion.section
      className="container flex flex-col items-center"
      variants={getSectionVariant()}>
      <motion.h2
        className="py-4 text-center text-textPrimary sm:py-8"
        variants={createStaggeredFlip(sectionIndex * 0.1 + 0.3, 0.1)(0)}>
        {title}
      </motion.h2>
      <motion.div
        className={`grid ${gridCols} gap-4`}
        variants={staggerContainer}>
        {skills.map((skill, i) => (
          <motion.div
            key={String(skill.id)}
            variants={createStaggeredFlip(sectionIndex * 0.1 + 0.4, gridCols.includes('md:grid-cols-3') ? 0.15 : 0.2)(i)}>
            <motion.div
              className="relative"
              {...getCardAnimation(i)}>
              <SkillTemplate
                id={String(skill.id)}
                icon={skill.icon}
                skillName={skill.name}
                description={skill.description}
                proficiency={skill.proficiency}
                officialSite={skill.officialSite}
                isAnyModalOpen={isAnyModalOpen}
                setIsAnyModalOpen={setIsAnyModalOpen}
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default SkillSection;