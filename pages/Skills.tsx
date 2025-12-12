import Languages from "../components/Languages";
import Libraries from "../components/Libraries";
import Frameworks from "../components/Frameworks";
import Tools from "../components/Tools";
import Services from "../components/Services";
import Learn from "../components/Learn";

import SkillTemplate from "../components/SkillTemplate";

import { motion } from "framer-motion";
import { staggerContainer, createStaggeredFlip, flipFromTop, flipFromBottom, flipFromLeft, flipFromRight } from "../components/animations/pageAnimations";

function Skills() {
  return (
    <motion.div
        className='flex justify-center bg-gradient-to-b from-primary to-secondary scr h-[calc(100vh-3px)] overflow-y-auto scrollbar-hide'
        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* <motion.h1
          className="pt-6 text-2xl font-semibold text-center cursor-pointer text-textPrimary"
          variants={flipFromTop}
        >
          My Skillset
        </motion.h1> */}

        <motion.div
          className="grid-cols-3 gap-4 pt-3 pb-12 mx-auto md:grid md:max-w-4xl lg:max-w-7xl"
          variants={staggerContainer}
        >
          <motion.section
            className="container flex flex-col items-center"
            variants={flipFromLeft}
          >
            <motion.h2
              className="py-4 text-center text-textPrimary sm:py-8"
              variants={createStaggeredFlip(0.3, 0.1)(0)}
            >
              Programming Languages
            </motion.h2>
            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={staggerContainer}
            >
              {Languages.map((language, i) => (
                <motion.div
                  key={String(language.id)}
                  variants={createStaggeredFlip(0.4, 0.2)(i)}
                >
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, x: -200, rotateY: -45 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <SkillTemplate
                      id={String(language.id)}
                      icon={language.icon}
                      skillName={language.name}
                      description={language.description}
                      proficiency={language.proficiency}
                      officialSite={language.officialSite}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          <motion.section
            className="container flex flex-col items-center"
            variants={flipFromTop}
          >
            <motion.h2
              className="py-4 text-center text-textPrimary sm:py-8"
              variants={createStaggeredFlip(0.5, 0.1)(0)}
            >
              Libraries
            </motion.h2>
            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={staggerContainer}
            >
              {Libraries.map((library, i) => (
                <motion.div
                  key={String(library.id)}
                  variants={createStaggeredFlip(0.6, 0.2)(i)}
                >
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: -200, rotateX: -45 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <SkillTemplate
                      id={String(library.id)}
                      icon={library.icon}
                      skillName={library.name}
                      description={library.description}
                      proficiency={library.proficiency}
                      officialSite={library.officialSite}
                    />
                  </motion.div>
                </motion.div>
              ))}
          </motion.div>
        </motion.section>

          <motion.section
            className="container flex flex-col items-center"
            variants={flipFromRight}
          >
            <motion.h2
              className="py-4 text-center text-textPrimary sm:py-8"
              variants={createStaggeredFlip(0.7, 0.1)(0)}
            >
              Frameworks
            </motion.h2>
            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={staggerContainer}
            >
              {Frameworks.map((framework, i) => (
                <motion.div
                  key={String(framework.id)}
                  variants={createStaggeredFlip(0.8, 0.2)(i)}
                >
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, x: 200, rotateY: 45 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <SkillTemplate
                      id={String(framework.id)}
                      icon={framework.icon}
                      skillName={framework.name}
                      description={framework.description}
                      proficiency={framework.proficiency}
                      officialSite={framework.officialSite}
                    />
                  </motion.div>
                </motion.div>
              ))}
          </motion.div>
        </motion.section>

          <motion.section
            className="container flex flex-col items-center"
            variants={flipFromLeft}
          >
            <motion.h2
              className="py-4 text-center text-textPrimary sm:py-8"
              variants={createStaggeredFlip(0.9, 0.1)(0)}
            >
              Tools
            </motion.h2>
            <motion.div
              className="grid grid-cols-2 gap-4 md:grid-cols-3"
              variants={staggerContainer}
            >
              {Tools.map((tool, i) => (
                <motion.div
                  key={String(tool.id)}
                  variants={createStaggeredFlip(1.0, 0.15)(i)}
                >
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, x: -200, rotateY: -45 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <SkillTemplate
                      id={String(tool.id)}
                      icon={tool.icon}
                      skillName={tool.name}
                      description={tool.description}
                      proficiency={tool.proficiency}
                      officialSite={tool.officialSite}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
         </motion.section>

          <motion.section
            className="container flex flex-col items-center"
            variants={flipFromBottom}
          >
            <motion.h2
              className="py-4 text-center text-textPrimary sm:py-8"
              variants={createStaggeredFlip(1.1, 0.1)(0)}
            >
              To Learn
            </motion.h2>
            <motion.div
              className="grid grid-cols-2 gap-4 md:grid-cols-2"
              variants={staggerContainer}
            >
              {Learn.map((lesson, i) => (
                <motion.div
                  key={String(lesson.id)}
                  variants={createStaggeredFlip(1.2, 0.2)(i)}
                >
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 200, rotateX: 45 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <SkillTemplate
                      id={String(lesson.id)}
                      icon={lesson.icon}
                      skillName={lesson.name}
                      description={lesson.description}
                      proficiency={lesson.proficiency}
                      officialSite={lesson.officialSite}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          <motion.section
            className="container flex flex-col items-center col-start-3"
            variants={flipFromRight}
          >
            <motion.h2
              className="py-4 text-center text-textPrimary sm:py-8"
              variants={createStaggeredFlip(1.3, 0.1)(0)}
            >
              Services
            </motion.h2>
            <motion.div
              className="grid grid-cols-2 gap-4 md:grid-cols-3"
              variants={staggerContainer}
            >
              {Services.map((service, i) => (
                <motion.div
                  key={String(service.id)}
                  variants={createStaggeredFlip(1.4, 0.15)(i)}
                >
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, x: 200, rotateY: 45 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <SkillTemplate
                      id={String(service.id)}
                      icon={service.icon}
                      skillName={service.name}
                      description={service.description}
                      proficiency={service.proficiency}
                      officialSite={service.officialSite}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </motion.div>
      </motion.div>
  );
}

export default Skills;
