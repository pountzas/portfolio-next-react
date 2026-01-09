import { Variants } from 'framer-motion';

// Page transition animations - flip-in effects
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    rotateX: -90,
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth flip
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    rotateX: 90,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Flip-out animation for page exit with entry states for header
export const flipOut: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
    rotateY: -45,
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    rotateY: 45,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Stagger flip-out for multiple elements
export const staggerFlipOut: Variants = {
  exit: {
    transition: {
      staggerChildren: -0.05, // Negative stagger for reverse order
      staggerDirection: -1,
    },
  },
};

// Stagger container for multiple items
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    transition: {
      staggerChildren: -0.05,
      staggerDirection: -1,
    },
  },
};

// Flip-in animation for individual items
export const flipInItem: Variants = {
  initial: {
    opacity: 0,
    rotateY: -90,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Slide and flip combination for more dynamic effects
export const slideFlipIn: Variants = {
  initial: {
    opacity: 0,
    x: -100,
    rotateY: -45,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Flip from different directions
export const flipFromTop: Variants = {
  initial: {
    opacity: 0,
    rotateX: -90,
    y: -50,
  },
  animate: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const flipFromBottom: Variants = {
  initial: {
    opacity: 0,
    rotateX: 90,
    y: 50,
  },
  animate: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const flipFromLeft: Variants = {
  initial: {
    opacity: 0,
    rotateY: -90,
    x: -50,
  },
  animate: {
    opacity: 1,
    rotateY: 0,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const flipFromRight: Variants = {
  initial: {
    opacity: 0,
    rotateY: 90,
    x: 50,
  },
  animate: {
    opacity: 1,
    rotateY: 0,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Staggered flip animations with increasing delay
export const createStaggeredFlip = (baseDelay: number = 0.1, stagger: number = 0.1) => {
  return (index: number): Variants => ({
    initial: {
      opacity: 0,
      rotateY: -90,
      scale: 0.8,
    },
    animate: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: baseDelay + (index * stagger),
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  });
};

// Pulse flip effect for attention-grabbing elements
export const pulseFlip: Variants = {
  animate: {
    rotateY: [0, -10, 10, -5, 5, 0],
    scale: [1, 1.05, 1.05, 1.02, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatDelay: 3,
      ease: "easeInOut",
    },
  },
};

// Hover flip effect for interactive elements
export const hoverFlip: Variants = {
  hover: {
    rotateY: 15,
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};
