import Languages from "../components/Languages";
import Libraries from "../components/Libraries";
import Frameworks from "../components/Frameworks";
import Tools from "../components/Tools";
import Services from "../components/Services";
import Learn from "../components/Learn";

import SkillSection from "../components/SkillSection";

import { motion } from "framer-motion";
import { staggerContainer } from "../components/animations/pageAnimations";
import { useState } from "react";

function Skills() {
  const [isAnyModalOpen, setIsAnyModalOpen] = useState(false);

  return (
    <div className="h-[calc(100vh-3px)] overflow-y-auto scrollbar-hide pb-16">
      <motion.div
        // className="flex justify-center bg-gradient-to-b from-primary to-secondary overflow-y-auto h-screen scrollbar-hide"
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        exit="exit">
        {/* <motion.h1
          className="pt-6 text-2xl font-semibold text-center cursor-pointer text-textPrimary"
          variants={flipFromTop}
        >
          My Skillset
        </motion.h1> */}

        <motion.div
          className="grid-cols-3 gap-4 pt-3 pb-12 mx-auto md:grid md:max-w-4xl lg:max-w-7xl"
          variants={staggerContainer}>
          <SkillSection
            title="Programming Languages"
            skills={Languages}
            sectionIndex={0}
            gridCols="grid-cols-2"
            entryAnimation="left"
            isAnyModalOpen={isAnyModalOpen}
            setIsAnyModalOpen={setIsAnyModalOpen}
          />

          <SkillSection
            title="Libraries"
            skills={Libraries}
            sectionIndex={1}
            gridCols="grid-cols-2"
            entryAnimation="top"
            isAnyModalOpen={isAnyModalOpen}
            setIsAnyModalOpen={setIsAnyModalOpen}
          />

          <SkillSection
            title="Frameworks"
            skills={Frameworks}
            sectionIndex={2}
            gridCols="grid-cols-2"
            entryAnimation="right"
            isAnyModalOpen={isAnyModalOpen}
            setIsAnyModalOpen={setIsAnyModalOpen}
          />

          <SkillSection
            title="Tools"
            skills={Tools}
            sectionIndex={3}
            gridCols="grid-cols-2 md:grid-cols-3"
            entryAnimation="left"
            isAnyModalOpen={isAnyModalOpen}
            setIsAnyModalOpen={setIsAnyModalOpen}
          />

          <SkillSection
            title="To Learn"
            skills={Learn}
            sectionIndex={4}
            gridCols="grid-cols-2 md:grid-cols-2"
            entryAnimation="bottom"
            isAnyModalOpen={isAnyModalOpen}
            setIsAnyModalOpen={setIsAnyModalOpen}
          />

          <SkillSection
            title="Services"
            skills={Services}
            sectionIndex={5}
            gridCols="grid-cols-2 md:grid-cols-3"
            entryAnimation="right"
            isAnyModalOpen={isAnyModalOpen}
            setIsAnyModalOpen={setIsAnyModalOpen}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Skills;
