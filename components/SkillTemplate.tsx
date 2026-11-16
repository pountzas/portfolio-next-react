import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  fuseBurnVariants,
  createBorderFusePath,
} from "./animations/fireAnimations";
import { SkillTemplateProps } from "../types";
import ModalWrapper from "./ModalWrapper";
import {
  SKILL_CLOSE_BUTTON_CLASS_NAME,
  skillFireGradientId,
  skillProficiencyLabel,
  skillTitleId,
} from "./skillTemplateA11y.mjs";

function SkillTemplate({
  id,
  icon,
  skillName,
  description,
  proficiency,
  officialSite,
  isAnyModalOpen = false,
  setIsAnyModalOpen,
}: SkillTemplateProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const titleId = skillTitleId(id);
  const fireGradientId = skillFireGradientId(id);
  const proficiencyValue = proficiency ?? 80;
  const allowHoverAnimation =
    !shouldReduceMotion && !isAnyModalOpen && !showModal;

  const handleOpenModal = () => {
    setShowModal(true);
    setIsAnyModalOpen?.(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsAnyModalOpen?.(false);
    setIsHovered(false);
  };

  const handleHoverStart = () => {
    if (allowHoverAnimation) {
      setIsHovered(true);
    }
  };

  const handleHoverEnd = () => {
    if (!showModal) {
      setIsHovered(false);
    }
  };

  return (
    <>
      <ModalWrapper
        isOpen={showModal}
        onClose={handleCloseModal}
        labelledBy={titleId}
      >
        <AnimatePresence>
          {showModal && (
            <>
              <motion.button
                type="button"
                aria-label="Close dialog overlay"
                className="fixed inset-0 z-[60] bg-black bg-opacity-10 cursor-default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
                onClick={handleCloseModal}
              />
              <motion.div
                className="fixed z-[70] w-[90vw] max-w-[500px] min-h-[400px] rounded-lg border border-borderSecondary bg-quaternary p-4 shadow-xl text-gray-500"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
                }}
                initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
              >
                <motion.button
                  type="button"
                  aria-label="Close"
                  className={SKILL_CLOSE_BUTTON_CLASS_NAME}
                  onClick={handleCloseModal}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.1 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.9 }}
                >
                  ✕
                </motion.button>

                <div
                  className="absolute top-6 left-6 text-4xl text-textPrimary"
                  aria-hidden="true"
                >
                  {icon}
                </div>

                <div className="mt-8 w-full px-2">
                  <h2
                    id={titleId}
                    className="mb-4 text-center text-3xl font-bold text-textPrimary"
                  >
                    {skillName}
                  </h2>

                  <p className="mb-6 text-center leading-relaxed text-textTertiary">
                    {description ||
                      "A versatile skill with broad applications in modern development."}
                  </p>

                  <div className="mb-6">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium text-textPrimary">
                        {skillProficiencyLabel(proficiencyValue)}
                      </span>
                      <span className="text-textTertiary">
                        {proficiencyValue}%
                      </span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-tertiary">
                      <motion.div
                        className="h-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${proficiencyValue}%` }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 1.5,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                      />
                    </div>
                  </div>

                  {officialSite && (
                    <div className="mb-4 flex justify-center">
                      <a
                        href={officialSite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
                      >
                        <span>Official Site</span>
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </ModalWrapper>

      <motion.button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={showModal}
        aria-label={skillName}
        className={`relative m-2 flex flex-col items-center justify-center gap-1 border p-2 text-gray-500 shadow-xl transition duration-150 ease-in-out rounded-xl border-borderSecondary bg-quaternary md:w-20 md:min-h-20 shadow-quaternary ${
          !showModal && "grayscale hover:grayscale-0"
        }`}
        onClick={handleOpenModal}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        style={{
          zIndex: 10,
          boxShadow:
            isHovered && allowHoverAnimation
              ? "0 0 30px rgba(255, 100, 0, 0.6)"
              : undefined,
        }}
      >
        <AnimatePresence>
          {isHovered && allowHoverAnimation && (
            <motion.svg
              className="pointer-events-none absolute inset-0 z-20 h-full w-full rounded-xl"
              viewBox="0 0 64 64"
              aria-hidden="true"
              focusable="false"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.path
                d={createBorderFusePath(64, 64, 12)}
                fill="none"
                stroke={`url(#${fireGradientId})`}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={fuseBurnVariants(2)}
                initial="initial"
                animate="animate"
              />
              <defs>
                <linearGradient
                  id={fireGradientId}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#ff4500" />
                  <stop offset="25%" stopColor="#ff6347" />
                  <stop offset="50%" stopColor="#ffa500" />
                  <stop offset="75%" stopColor="#ffd700" />
                  <stop offset="100%" stopColor="#ffff00" />
                </linearGradient>
              </defs>
            </motion.svg>
          )}
        </AnimatePresence>

        <div
          className="relative z-10 flex items-center justify-center text-3xl md:text-5xl"
          aria-hidden="true"
        >
          {icon}
        </div>
        <span className="relative z-10 max-w-[4.5rem] text-center text-[10px] font-semibold leading-tight text-textTertiary md:text-xs">{skillName}</span>
      </motion.button>
    </>
  );
}

export default SkillTemplate;
