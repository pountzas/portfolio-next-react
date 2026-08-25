import Head from "next/head";
import { useState } from "react";
import SkillSection from "../components/SkillSection";
import SkillsAnimations from "../components/animations/SkillsAnimations";
import { SKILL_SECTIONS } from "../lib/skills";

function Skills() {
  const [isAnyModalOpen, setIsAnyModalOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Skills & Technologies - Nikos Pountzas Portfolio</title>
        <meta
          name="description"
          content="Explore Nikos Pountzas's technical skills across languages, web, native apps, backend, tooling, and design — including Rust, Tauri, Firebase, Supabase, React, and Next.js."
        />
        <meta
          name="keywords"
          content="Nikos Pountzas, technical skills, React, Next.js, TypeScript, Rust, Tauri, Firebase, Supabase, React Native, web development"
        />
        <meta
          property="og:title"
          content="Skills & Technologies - Nikos Pountzas Portfolio"
        />
        <meta
          property="og:description"
          content="Technical skills grouped by what I ship: languages, web, native apps, backend & data, tooling, and design."
        />
        <meta property="og:url" content="https://pountzas-portfolio.vercel.app/skills" />
        <meta
          name="twitter:title"
          content="Skills & Technologies - Nikos Pountzas Portfolio"
        />
        <meta
          name="twitter:description"
          content="Explore my technical skills and development expertise."
        />
        <link rel="canonical" href="https://pountzas-portfolio.vercel.app/skills" />
      </Head>
      <div className="h-[calc(100vh-3px)] overflow-y-auto scrollbar-hide pb-16">
        <SkillsAnimations>
          {SKILL_SECTIONS.map((section, index) => (
            <SkillSection
              key={section.id}
              title={section.title}
              skills={section.skills}
              sectionIndex={index}
              gridCols={section.gridCols}
              entryAnimation={section.entryAnimation}
              isAnyModalOpen={isAnyModalOpen}
              setIsAnyModalOpen={setIsAnyModalOpen}
            />
          ))}
        </SkillsAnimations>
      </div>
    </>
  );
}

export default Skills;
