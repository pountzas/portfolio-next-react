"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "./pageAnimations";
import { ReactNode } from "react";

interface SkillsAnimationsProps {
  children: ReactNode;
}

export default function SkillsAnimations({ children }: SkillsAnimationsProps) {
  return (
    <motion.div
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      exit="exit">
      <motion.div
        className="grid-cols-3 gap-4 pt-3 pb-12 mx-auto md:grid md:max-w-4xl lg:max-w-7xl"
        variants={staggerContainer}>
        {children}
      </motion.div>
    </motion.div>
  );
}
