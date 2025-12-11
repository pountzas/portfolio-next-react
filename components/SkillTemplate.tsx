import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fuseBurnVariants, borderGlowVariants, createBorderFusePath, createFireParticles, skillCardToModalVariants, iconToModalVariants } from './animations/fireAnimations';
import SkillModal from './SkillModal';

interface SkillTemplateProps {
  id: string;
  icon: React.ReactNode;
  skillName: string;
  description?: string;
  proficiency?: number;
}

function SkillTemplate({ id, icon, skillName, description, proficiency }: SkillTemplateProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fireCompleted, setFireCompleted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 80, height: 80 });

  // Get container dimensions for SVG path
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDimensions({
        width: rect.width,
        height: rect.height,
      });
    }
  }, []);

  // Handle fire animation completion
  useEffect(() => {
    if (fireCompleted && isHovered) {
      // Small delay before showing modal
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [fireCompleted, isHovered]);

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setFireCompleted(false);
    setIsHovered(false);
  };

  // Handle hover start
  const handleHoverStart = () => {
    setIsHovered(true);
    setFireCompleted(false);
  };

  // Handle hover end
  const handleHoverEnd = () => {
    if (!showModal) {
      setIsHovered(false);
      setFireCompleted(false);
    }
  };

  return (
    <>
      <motion.div
        ref={containerRef}
        className="relative z-20 flex items-center justify-center w-16 h-16 p-2 m-2 text-gray-500 transition duration-150 ease-in-out border shadow-xl rounded-xl border-borderSecondary hover:bg-tertiary grayscale hover:grayscale-0 bg-quaternary md:w-20 md:h-20 duration-400 shadow-quaternary"
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        animate={isHovered && !showModal ? "animate" : "initial"}
        variants={borderGlowVariants}
        transition={{ duration: 0.3 }}
      >
        {/* Fire SVG Animation */}
        <AnimatePresence>
          {isHovered && !showModal && (
            <motion.svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.path
                d={createBorderFusePath(dimensions.width, dimensions.height, 8)}
                fill="none"
                stroke="url(#fireGradient)"
                strokeWidth="3"
                variants={fuseBurnVariants(3)}
                initial="initial"
                animate="animate"
                onAnimationComplete={() => setFireCompleted(true)}
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
              {createFireParticles(8).map((particle) => (
                <motion.circle
                  key={particle.id}
                  cx={dimensions.width / 2 + particle.x}
                  cy={dimensions.height / 2 + particle.y}
                  r={particle.size}
                  fill={particle.color}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1,
                    delay: particle.delay,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                />
              ))}
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Skill Icon */}
        <motion.div
          className="relative z-10 flex items-center justify-center"
          animate={showModal ? "modal" : "initial"}
          variants={iconToModalVariants}
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
      </motion.div>

      {/* Skill Modal */}
      <SkillModal
        id={id}
        icon={icon}
        skillName={skillName}
        description={description}
        proficiency={proficiency}
        isOpen={showModal}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default SkillTemplate;
