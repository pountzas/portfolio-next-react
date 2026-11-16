import Link from "next/link";
import { motion } from "framer-motion";
import { ariaCurrentPage } from "./navA11y.mjs";

interface NavItemProps {
  label: string;
  path: string;
  mobileIcon: React.ReactNode;
  isActive: boolean;
}

export default function NavItem({
  label,
  path,
  mobileIcon,
  isActive,
}: NavItemProps) {
  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.05 }}
      whileTap={{
        scale: 0.95,
        transition: { type: "spring", stiffness: 400, damping: 17 },
      }}
      animate={{
        scale: isActive ? 1.08 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      <motion.div
        className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-textPrimary"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: isActive ? 1 : 0,
          opacity: isActive ? 1 : 0,
          boxShadow: isActive
            ? "0 0 10px rgba(var(--color-text-primary-rgb), 0.5)"
            : "none",
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
          scaleX: { type: "spring", stiffness: 200, damping: 20 },
        }}
      />

      <Link
        href={path}
        aria-current={ariaCurrentPage(isActive)}
        aria-label={label}
        className="flex min-h-6 min-w-6 items-center"
      >
        <motion.div
          className={`hidden px-1 text-lg font-semibold uppercase transition-colors duration-300 md:block ${
            isActive ? "text-textPrimary" : ""
          }`}
          animate={{
            textShadow: isActive
              ? "0 0 8px rgba(var(--color-text-primary-rgb), 0.4)"
              : "none",
            y: isActive ? [0, -2, 0] : 0,
          }}
          transition={{
            textShadow: { duration: 0.3 },
            y: {
              duration: 0.6,
              ease: "easeInOut",
            },
          }}
        >
          {label}
        </motion.div>

        <motion.div
          className={`text-2xl transition-colors duration-300 md:hidden ${
            isActive ? "text-textPrimary" : ""
          }`}
          aria-hidden="true"
          animate={{
            scale: isActive ? 1.1 : 1,
            textShadow: isActive
              ? "0 0 8px rgba(var(--color-text-primary-rgb), 0.3)"
              : "none",
          }}
          transition={{ duration: 0.3 }}
        >
          {mobileIcon}
        </motion.div>
      </Link>
    </motion.div>
  );
}
