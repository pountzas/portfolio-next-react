import React from 'react';
import { motion } from 'framer-motion';

interface NavItemProps {
  label: string;
  path: string;
  mobileIcon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ label, path, mobileIcon, isActive, onClick }) => {
  return (
    <motion.div
      className='cursor-pointer relative'
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{
        scale: 0.95,
        transition: { type: "spring", stiffness: 400, damping: 17 }
      }}
      animate={{
        scale: isActive ? 1.08 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      {/* Active indicator line */}
      <motion.div
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-textPrimary rounded-full"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: isActive ? 1 : 0,
          opacity: isActive ? 1 : 0,
          boxShadow: isActive ? '0 0 10px rgba(var(--color-text-primary-rgb), 0.5)' : 'none'
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
          scaleX: { type: "spring", stiffness: 200, damping: 20 }
        }}
      />

      {/* Desktop text */}
      <motion.div
        className={`hidden md:block px-1 text-lg uppercase font-semibold transition-colors duration-300
        ${isActive ? 'text-textPrimary' : ''}`}
        animate={{
          textShadow: isActive ? '0 0 8px rgba(var(--color-text-primary-rgb), 0.4)' : 'none',
          y: isActive ? [0, -2, 0] : 0
        }}
        transition={{
          textShadow: { duration: 0.3 },
          y: {
            duration: 0.6,
            ease: "easeInOut"
          }
        }}
      >
        {label}
      </motion.div>

      {/* Mobile icon */}
      <motion.div
        className={`text-2xl md:hidden transition-colors duration-300 ${isActive ? 'text-textPrimary' : ''
          }`}
        animate={{
          scale: isActive ? 1.1 : 1,
          textShadow: isActive ? '0 0 8px rgba(var(--color-text-primary-rgb), 0.3)' : 'none'
        }}
        transition={{ duration: 0.3 }}
      >
        {mobileIcon}
      </motion.div>
    </motion.div>
  );
};

export default NavItem;

