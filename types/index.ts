// Centralized Type Definitions for Nikos Pountzas Portfolio
// This file consolidates all TypeScript interfaces and types used throughout the application

import React from 'react';

// =============================================================================
// SKILL-RELATED TYPES
// =============================================================================

/**
 * Base skill item interface with common properties for all skill categories
 */
export interface BaseSkillItem {
  id: string | number;
  name: string;
  icon: React.ReactElement;
  description: string;
  proficiency: number;
  officialSite: string;
}

/**
 * Programming language skill item
 */
export interface Language extends BaseSkillItem {}

/**
 * Framework skill item (Next.js, Rails, Tailwind, Bootstrap, etc.)
 */
export interface Framework extends BaseSkillItem {}

/**
 * Library skill item (React, Redux, Framer Motion, etc.)
 */
export interface Library extends BaseSkillItem {}

/**
 * Development tool skill item (VS Code, Git, Photoshop, etc.)
 */
export interface Tool extends BaseSkillItem {}

/**
 * Service/platform skill item (GitHub, Firebase, Vercel, etc.)
 */
export interface Service extends BaseSkillItem {}

/**
 * Learning goal skill item (Web3, Solidity, Three.js, etc.)
 */
export interface LearningItem extends BaseSkillItem {}

// =============================================================================
// COMPONENT PROPS TYPES
// =============================================================================

/**
 * Props for the SkillTemplate component
 */
export interface SkillTemplateProps {
  id: string;
  icon: React.ReactNode;
  skillName: string;
  description?: string;
  proficiency?: number;
  officialSite?: string;
  isAnyModalOpen?: boolean;
  setIsAnyModalOpen?: (isOpen: boolean) => void;
}

// =============================================================================
// SOCIAL MEDIA TYPES
// =============================================================================

/**
 * Social media platform item
 */
export interface SocialItem {
  id: number;
  name: string;
  path: string;
  icon: React.JSX.Element;
}

// =============================================================================
// COMMON UTILITY TYPES
// =============================================================================

/**
 * Generic ID type for entities
 */
export type EntityId = string | number;

/**
 * Generic name/value pair for dropdowns, selects, etc.
 */
export interface NameValuePair<T = string> {
  name: string;
  value: T;
}

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// =============================================================================
// ANIMATION TYPES
// =============================================================================

/**
 * Framer Motion animation variant type
 */
export type AnimationVariant = Record<string, any>;

/**
 * Page transition configuration
 */
export interface PageTransition {
  initial: AnimationVariant;
  animate: AnimationVariant;
  exit: AnimationVariant;
}

// =============================================================================
// RE-EXPORT EXISTING TYPES
// =============================================================================

// Re-export GitHub types from github.ts
export * from './github';
