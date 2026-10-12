import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CLOSE_OVERLAY_ARIA_LABEL } from "./projectCardA11y.mjs";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ isOpen, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.button
          key="project-overlay"
          type="button"
          className="fixed inset-0 z-[110] bg-black/60 cursor-default"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          aria-label={CLOSE_OVERLAY_ARIA_LABEL}
        />
      )}
    </AnimatePresence>
  );
}
