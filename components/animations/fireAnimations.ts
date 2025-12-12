import { Variants } from 'framer-motion';

// Fire particle animation variants
export const fireParticleVariants: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: [0, 1.2, 0.8],
    opacity: [0, 1, 0.7],
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

// Fuse burning animation - travels along border path
export const fuseBurnVariants = (duration: number = 3): Variants => ({
  initial: {
    pathLength: 0,
    opacity: 0,
  },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: duration,
        ease: "easeInOut",
      },
      opacity: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
  },
});

// Border glow effect during fuse burning
export const borderGlowVariants: Variants = {
  initial: {
    boxShadow: "0 0 0 rgba(255, 100, 0, 0)",
  },
  animate: {
    boxShadow: [
      "0 0 0 rgba(255, 100, 0, 0)",
      "0 0 20px rgba(255, 100, 0, 0.5)",
      "0 0 40px rgba(255, 150, 0, 0.8)",
      "0 0 60px rgba(255, 200, 0, 1)",
      "0 0 40px rgba(255, 150, 0, 0.8)",
      "0 0 20px rgba(255, 100, 0, 0.5)",
      "0 0 0 rgba(255, 100, 0, 0)"
    ],
    transition: {
      duration: 3,
      ease: "easeInOut"
    }
  }
};

// Skill card transformation to modal
export const skillCardToModalVariants: Variants = {
  initial: {
    scale: 1,
    borderRadius: "0.5rem",
    zIndex: 1,
  },
  modal: {
    scale: [1, 1.1, 2],
    borderRadius: ["0.5rem", "1rem", "0.5rem"],
    zIndex: 50,
    position: "fixed",
    top: "50%",
    left: "50%",
    x: "-50%",
    y: "-50%",
    width: "90vw",
    maxWidth: "500px",
    height: "auto",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Icon movement to modal position
export const iconToModalVariants: Variants = {
  initial: {
    position: "relative",
    top: 0,
    right: 0,
    scale: 1,
  },
  modal: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    scale: 1.2,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.3,
    },
  },
};

// Modal overlay animation
export const modalOverlayVariants: Variants = {
  initial: {
    opacity: 0,
    backdropFilter: "blur(0px)",
  },
  animate: {
    opacity: 1,
    backdropFilter: "blur(8px)",
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    backdropFilter: "blur(0px)",
    transition: {
      duration: 0.3,
    },
  },
};

// SVG path for border fuse animation (rectangular path)
export const createBorderFusePath = (width: number = 200, height: number = 120, borderRadius: number = 8) => {
  const br = borderRadius;
  const w = width - 2 * br;
  const h = height - 2 * br;

  // Start from top-left corner, go clockwise around the border
  return `
    M ${br} 0
    L ${w + br} 0
    Q ${width} 0 ${width} ${br}
    L ${width} ${h + br}
    Q ${width} ${height} ${w + br} ${height}
    L ${br} ${height}
    Q 0 ${height} 0 ${h + br}
    L 0 ${br}
    Q 0 0 ${br} 0
    Z
  `;
};

// Fire particle system for enhanced visual effect
export const fireParticlesConfig = {
  count: 12,
  colors: ['#ff4500', '#ff6347', '#ffa500', '#ffd700', '#ffff00'],
  sizes: [2, 3, 4, 5],
  spread: 20,
};

// Create staggered fire particle animations
export const createFireParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    delay: i * 0.1,
    color: fireParticlesConfig.colors[i % fireParticlesConfig.colors.length],
    size: fireParticlesConfig.sizes[i % fireParticlesConfig.sizes.length],
    x: (Math.random() - 0.5) * fireParticlesConfig.spread,
    y: (Math.random() - 0.5) * fireParticlesConfig.spread,
  }));
};
