import Header from '../components/Header';
import Footer from '../components/Footer';

import Languages from '../components/Languages';
import Libraries from '../components/Libraries';
import Frameworks from '../components/Frameworks';
import Tools from '../components/Tools';
import Services from '../components/Services';
import Learn from '../components/Learn';

import SkillTemplate from '../components/SkillTemplate';

import { motion } from 'framer-motion';

function Skills() {

  return (
    <div className='max-h-screen overflow-y-scroll cursor-pointer bg-tertiary scrollbar-hide'>
      <Header />
      <h1 className='pt-6 text-2xl font-semibold text-center cursor-pointer text-textPrimary'>
        My Skillset
      </h1>

      <div className='grid-cols-3 gap-4 pt-3 pb-12 mx-auto md:grid md:max-w-4xl lg:max-w-7xl'>

        <section className='container flex flex-col items-center'>
          <h2 className='py-4 text-center text-textPrimary sm:py-8'>
            Programing Languages
          </h2>
          <div className='grid grid-cols-2 gap-4'>
            {Languages.map((language, i) => (
              <motion.div className='relative'
                initial={{ opacity: 0, translateX: -200 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 0.4, delay: i * 0.4 }}
                key={String(language.id)}
                {...({} as any)}
              >
                <SkillTemplate
                  id={String(language.id)}
                  icon={language.icon}
                  skillName={String(language.name)}
                />
              </motion.div>
            ))}
          </div>
        </section>

        <section className='container flex flex-col items-center'>
          <h2 className='py-4 text-center text-textPrimary sm:py-8'>
            Libraries
          </h2>
          <div className='grid grid-cols-2 gap-4'>
            {Libraries.map((library, i) => (
              <motion.div className='relative'
                initial={{ opacity: 0, translateY: -200 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.4, delay: i * 0.4 }}
                key={String(library.id)}
                {...({} as any)}
              >
                <SkillTemplate
                  id={String(library.id)}
                  icon={library.icon}
                  skillName={String(library.name)}
                />
              </motion.div>
            ))}
          </div>
        </section>

        <section className='container flex flex-col items-center'>
          <h2 className='py-4 text-center text-textPrimary sm:py-8'>
            Frameworks
          </h2>
          <div className='grid grid-cols-2 gap-4'>
            {Frameworks.map((framework, i) => (
              <motion.div className='relative'
                initial={{ opacity: 0, translateX: 200 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 0.4, delay: i * 0.4 }}
                key={String(framework.id)}
                {...({} as any)}
              >
                <SkillTemplate
                  id={String(framework.id)}
                  icon={framework.icon}
                  skillName={String(framework.name)}
                />
              </motion.div>
            ))}
          </div>
        </section>

        <section className='container flex flex-col items-center'>
          <h2 className='py-4 text-center text-textPrimary sm:py-8'>
            Tools
          </h2>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
            {Tools.map((tool, i) => (
              <motion.div className='relative'
                initial={{ opacity: 0, translateX: -200 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 0.4, delay: i * 0.4 }}
                key={String(tool.id)}
                {...({} as any)}
              >
                <SkillTemplate
                  id={String(tool.id)}
                  icon={tool.icon}
                  skillName={String(tool.name)}
                />
              </motion.div>
            ))}
          </div>
        </section>

        <section className='container flex flex-col items-center'>
          <h2 className='py-4 text-center text-textPrimary sm:py-8'>
            To Learn
          </h2>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-2'>
            {Learn.map((lesson, i) => (
              <motion.div className='relative'
                initial={{ opacity: 0, translateY: 200 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.4, delay: i * 0.4 }}
                key={String(lesson.id)}
                {...({} as any)}
              >
                <SkillTemplate
                  id={String(lesson.id)}
                  icon={lesson.icon}
                  skillName={String(lesson.name)}
                />
              </motion.div>
            ))}
          </div>
        </section>

        <section className='container flex flex-col items-center col-sstart-3'>
          <h2 className='py-4 text-center text-textPrimary sm:py-8'>
            Services
          </h2>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
            {Services.map((service, i) => (
              <motion.div
                initial={{ opacity: 0, translateX: 200 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 0.4, delay: i * 0.4 }}
                key={String(service.id)}
                {...({} as any)}
              >
                <SkillTemplate
                  id={String(service.id)}
                  icon={service.icon}
                  skillName={String(service.name)}
                />
              </motion.div>
            ))}
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
}

export default Skills;


