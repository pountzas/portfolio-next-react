import { useState, useRef, useEffect, Activity } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fuseBurnVariants, borderGlowVariants, createBorderFusePath, createFireParticles } from './animations/fireAnimations';
import { SkillTemplateProps } from '../types';
import ModalWrapper from './ModalWrapper';

// Animation variants for skill card transformation
const skillCardVariants = {
  card: {
    borderRadius: "0.75rem",
    scale: 1,
    position: "relative",
    zIndex: 10,
    width: "64px",
    height: "64px",
    minWidth: "64px",
    minHeight: "64px",
    // Let CSS classes handle width/height for proper responsive behavior
  },
  modal: {
    width: "90vw",
    maxWidth: "500px",
    height: "auto",
    minHeight: "400px",
    borderRadius: "0.5rem",
    scale: 1,
    position: "fixed",
    top: "50%",
    left: "50%",
    x: "-50%",
    y: "-50%",
  },
};

function SkillTemplate({ id, icon, skillName, description, proficiency, officialSite, isAnyModalOpen = false, setIsAnyModalOpen }: SkillTemplateProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [fireCompleted, setFireCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle fire animation completion
  useEffect(() => {
    if (fireCompleted && isHovered && !isAnyModalOpen) {
      // Only open modal if no other modal is currently open
      const timer = setTimeout(() => {
        setShowModal(true);
        setIsAnyModalOpen?.(true); // Notify parent that a modal is now open
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [fireCompleted, isHovered, isAnyModalOpen, setIsAnyModalOpen]);

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setIsAnyModalOpen?.(false); // Notify parent that no modal is open
    // Reset state after animation completes
    setTimeout(() => {
      setFireCompleted(false);
      setIsHovered(false);
    }, 700); // Match animation duration
  };

  // Handle hover start
  const handleHoverStart = () => {
    // Only allow hover if no modal is currently open
    if (!isAnyModalOpen) {
      setIsHovered(true);
      setFireCompleted(false);
    }
  };

  // Handle hover end
  const handleHoverEnd = () => {
    // Don't reset hover state if modal is shown
    if (!showModal) {
      setIsHovered(false);
      setFireCompleted(false);
    }
  };

  return (
    <>
      {/* Modal Overlay with Keyboard Support */}
      <ModalWrapper isOpen={showModal} onClose={handleCloseModal}>
        <AnimatePresence>
          <Activity mode={showModal ? "visible" : "hidden"} >
            <motion.div
              className="fixed inset-0 z-[60] bg-black bg-opacity-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleCloseModal}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
              }}
              />
            </Activity>
        </AnimatePresence>
      </ModalWrapper>

      {/* Skill Card */}
      <motion.div
        ref={containerRef}
        className={`relative flex items-center justify-center p-2 m-2 text-gray-500 transition duration-150 ease-in-out border shadow-xl rounded-xl border-borderSecondary bg-quaternary md:w-20 md:h-20 duration-400 shadow-quaternary ${!showModal && 'grayscale hover:grayscale-0' }`}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        animate={showModal ? "modal" : "card"}
        variants={skillCardVariants}
        transition={{
          duration: showModal ? 0.6 : 0.5,
          ease: "easeOut",
          type: "tween"
        }}
        style={{
          zIndex: showModal ? 60 : 10,
          boxShadow: showModal ? '0 25px 50px rgba(0,0,0,0.3)' : (isHovered && !showModal ? '0 0 30px rgba(255, 100, 0, 0.6)' : undefined),
          pointerEvents: 'auto',
          position: showModal ? 'fixed' : 'relative'
        }}
      >
        {/* Fire SVG Animation */}
        <AnimatePresence>
          {isHovered && !showModal && (
            <motion.svg
              className="absolute inset-0 w-full h-full rounded-xl pointer-events-none z-20"
              viewBox={`0 0 64 64`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.path
                d={createBorderFusePath(64, 64, 12)}
                fill="none"
                stroke="url(#fireGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={fuseBurnVariants(2)}
                initial="initial"
                animate="animate"
                onAnimationComplete={() => {
                  setFireCompleted(true);
                }}
              />

              {/* Fire gradient definition */}
              <defs>
                <linearGradient id="fireGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff4500" />
                  <stop offset="25%" stopColor="#ff6347" />
                  <stop offset="50%" stopColor="#ffa500" />
                  <stop offset="75%" stopColor="#ffd700" />
                  <stop offset="100%" stopColor="#ffff00" />
                </linearGradient>
              </defs>

              {/* Fire particles */}
              {/* {createFireParticles(15).map((particle) => (
                <motion.circle
                  key={particle.id}
                  cx={64 / 2 + particle.x}
                  cy={64 / 2 + particle.y}
                  r={particle.size}
                  fill={particle.color}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.5, 0.5, 0],
                    opacity: [0, 1, 0.8, 0],
                    y: particle.y - 20,
                  }}
                  transition={{
                    duration: 1.2,
                    delay: particle.delay,
                    repeat: 1,
                    repeatDelay: 1.5,
                    ease: "easeOut",
                  }}
                />
              ))} */}
            </motion.svg>
          )}
        </AnimatePresence>

        {showModal ? (
          // Modal Content
          <>
            {/* Close Button */}
            <motion.button
              className="absolute top-4 right-4 text-textTertiary hover:text-textPrimary text-xl"
              onClick={handleCloseModal}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={showModal ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: showModal ? 0.5 : 0, duration: 0.3 }}
            >
              ✕
            </motion.button>

            {/* Icon in top right */}
            <motion.div
              className="absolute top-6 left-6 text-4xl text-textPrimary"
              initial={{ scale: 1, x: 0, y: 0, opacity: 0 }}
              animate={showModal ? { scale: 1.2, x: 0, y: 0, opacity: 1 } : { scale: 1, x: 0, y: 0, opacity: 0 }}
              transition={{ delay: showModal ? 0.2 : 0, duration: 0.3 }}
            >
              {icon}
            </motion.div>

            {/* Modal Content */}
            <div className="mt-8 w-full px-2">
              <motion.h2
                className="text-3xl font-bold text-textPrimary mb-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={showModal ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: showModal ? 0.3 : 0, duration: 0.3 }}
              >
                {skillName}
              </motion.h2>

              <motion.p
                className="text-textTertiary mb-6 leading-relaxed text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={showModal ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: showModal ? 0.4 : 0, duration: 0.3 }}
              >
                {description || "A versatile skill with broad applications in modern development."}
              </motion.p>

              {/* Proficiency Bar */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={showModal ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: showModal ? 0.5 : 0, duration: 0.3 }}
              >
                {/* <div className="flex justify-between items-center mb-2">
                  <span className="text-textPrimary font-medium">Proficiency</span>
                  <span className="text-textTertiary">{proficiency || 80}%</span>
                  </div> */}
                <div className="w-full bg-tertiary rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${proficiency || 80}%` }}
                    transition={{
                      delay: 0.7,
                      duration: 1.5,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  />
                </div>
              </motion.div>

              {/* Official Site Link */}
              {officialSite && (
                <motion.div
                  className="flex justify-center mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={showModal ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: showModal ? 0.8 : 0, duration: 0.3 }}
                >
                  <a
                    href={officialSite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <span>Official Site</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </motion.div>
              )}

              {/* Action Button */}
              {/* <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={showModal ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: showModal ? (officialSite ? 0.9 : 0.8) : 0, duration: 0.3 }}
              >
                <motion.button
                  className="px-6 py-3 bg-textPrimary text-primary rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCloseModal}
                >
                  Close
                </motion.button>
              </motion.div> */}
            </div>
          </>
        ) : (
          // Card Content
          <>
            {/* Skill Icon */}
            <motion.div
              className="relative z-10 flex items-center justify-center"
            >
              <div className="text-3xl md:text-5xl">{icon && icon}</div>
            </motion.div>

            {/* Skill Name Tooltip */}
            <motion.span
              className="absolute inset-0 z-10 flex justify-center text-xs font-semibold opacity-0 text-textTertiary -top-6 whitespace-nowrap"
              animate={{ opacity: isHovered && !showModal ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {skillName}
            </motion.span>
          </>
        )}
      </motion.div>
    </>
  );
}
export default SkillTemplate;
