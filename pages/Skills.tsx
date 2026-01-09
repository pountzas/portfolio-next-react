import Languages from "../components/Languages";
import Libraries from "../components/Libraries";
import Frameworks from "../components/Frameworks";
import Tools from "../components/Tools";
import Services from "../components/Services";
import Learn from "../components/Learn";

import SkillSection from "../components/SkillSection";
import SkillsAnimations from "../components/animations/SkillsAnimations";

import { useState } from "react";

function Skills() {
  const [isAnyModalOpen, setIsAnyModalOpen] = useState(false);

  return (
    <div className="h-[calc(100vh-3px)] overflow-y-auto scrollbar-hide pb-16">
      <SkillsAnimations>
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
      </SkillsAnimations>
    </div>
  );
}

export default Skills;
