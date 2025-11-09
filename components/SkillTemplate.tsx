import { useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface SkillTemplateProps {
  id: string;
  icon: React.ReactNode;
  skillName: string;
}

function SkillTemplate({ id, icon, skillName }: SkillTemplateProps) {

  const motionProps = {
    transition: { delay: 0.8 },
    drag: true,
    dragElastic: 0.8,
    dragTransition: { bounceStiffness: 120, bounceDamping: 2.2 },
    dragPropagation: true,
    dragConstraints: { left: 0, right: 0, top: 0, bottom: 0 },
    className: 'relative z-20 flex items-center justify-center w-16 h-16 p-2 m-2 text-gray-500 transition duration-150 ease-in-out border shadow-xl hover: rounded-xl border-borderSecondary hover:bg-tertiary grayscale hover:grayscale-0 bg-quaternary md:w-20 md:h-20 duration-400 shadow-quaternary ',
    key: id
  };

  return (
    <motion.div {...(motionProps as any)}>
      <div className=''>
        <div className='flex items-center justify-center '>
          <div className='text-3xl md:text-5xl'>{icon && icon}</div>
        </div>
        <span className='absolute inset-0 z-10 flex justify-center text-xs font-semibold opacity-0 text-textTertiary -top-6 hover:opacity-100 whitespace-nowrap'>
          {skillName}
        </span>
      </div>
    </motion.div>
  );
}

export default SkillTemplate;
