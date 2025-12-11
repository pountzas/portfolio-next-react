import { motion } from 'framer-motion';
import { iconToModalVariants, modalOverlayVariants } from './animations/fireAnimations';

interface SkillModalProps {
  id: string;
  icon: React.ReactNode;
  skillName: string;
  description?: string;
  proficiency?: number;
  isOpen: boolean;
  onClose: () => void;
}

function SkillModal({
  id,
  icon,
  skillName,
  description = "A versatile skill with broad applications in modern development.",
  proficiency = 80,
  isOpen,
  onClose
}: SkillModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Modal Overlay */}
      <motion.div
        className="fixed inset-0 z-40 bg-black bg-opacity-50"
        variants={modalOverlayVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={onClose}
      />

      {/* Modal Content */}
      <motion.div
        className="fixed z-50 p-8 bg-quaternary border rounded-lg shadow-2xl border-borderSecondary"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90vw',
          maxWidth: '500px',
          height: 'auto',
        }}
        initial={{
          scale: 0.8,
          opacity: 0,
          borderRadius: "0.5rem"
        }}
        animate={{
          scale: 1,
          opacity: 1,
          borderRadius: "0.5rem",
          transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        }}
        exit={{
          scale: 0.8,
          opacity: 0,
          transition: {
            duration: 0.3,
          },
        }}
      >
        {/* Close Button */}
        <motion.button
          className="absolute top-4 right-4 text-textTertiary hover:text-textPrimary text-xl"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ✕
        </motion.button>

        {/* Icon in top right */}
        <motion.div
          className="absolute top-4 right-12 text-4xl text-textPrimary"
          variants={iconToModalVariants}
          initial="initial"
          animate="modal"
        >
          {icon}
        </motion.div>

        {/* Content */}
        <div className="mt-8">
          <motion.h2
            className="text-3xl font-bold text-textPrimary mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {skillName}
          </motion.h2>

          <motion.p
            className="text-textTertiary mb-6 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {description}
          </motion.p>

          {/* Proficiency Bar */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-textPrimary font-medium">Proficiency</span>
              <span className="text-textTertiary">{proficiency}%</span>
            </div>
            <div className="w-full bg-tertiary rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${proficiency}%` }}
                transition={{
                  delay: 0.7,
                  duration: 1.5,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              />
            </div>
          </motion.div>

          {/* Action Button */}
          <motion.div
            className="flex justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <motion.button
              className="px-6 py-3 bg-textPrimary text-primary rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
            >
              Close
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

export default SkillModal;
