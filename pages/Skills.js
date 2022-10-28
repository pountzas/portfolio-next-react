import Header from '../components/Header';
import Footer from '../components/Footer';

import Languages from '../components/Languages';
import Libraries from '../components/Libraries';
import Frameworks from '../components/Frameworks';
import Tools from '../components/Tools';
import Services from '../components/Services';
import Learn from '../components/Learn';


import SkillTemplate from '../components/SkillTemplate';

function Skills() {

  return (
    <div className='min-h-screen bg-tertiary'>
      <Header />
      <h1 className='pt-6 text-2xl font-semibold text-center text-textPrimary'>
        My Skillset
      </h1>
      <div className='grid-cols-3 gap-4 pt-3 pb-12 mx-auto md:grid md:max-w-4xl lg:max-w-7xl'>
        <section className='container flex flex-col items-center'>
          <h2 className='py-4 text-center text-textPrimary sm:py-8'>
            Programing Languages
          </h2>
          <div className='grid grid-cols-2 gap-4'>
            {Languages.map((language) => (
              <SkillTemplate
                key={language.id}
                id={language.id}
                icon={language.icon}
                skillName={language.name}
              />
            ))}
          </div>
        </section>

        <section className='container flex flex-col items-center'>
          <h2 className='py-4 text-center text-textPrimary sm:py-8'>
            Libraries
          </h2>
          <div className='grid grid-cols-2 gap-4'>
            {Libraries.map((library) => (
              <SkillTemplate
                key={library.id}
                id={library.id}
                icon={library.icon}
                skillName={library.name}
              />
            ))}
          </div>
        </section>

        <section className='container flex flex-col items-center'>
          <h2 className='py-4 text-center text-textPrimary sm:py-8'>
            Frameworks
          </h2>
          <div className='grid grid-cols-2 gap-4'>
            {Frameworks.map((framework) => (
              <SkillTemplate
                key={framework.id}
                id={framework.id}
                icon={framework.icon}
                skillName={framework.name}
              />
            ))}
          </div>
        </section>

        <section className='container flex flex-col items-center'>
          <h2 className='py-4 text-center text-textPrimary sm:py-8'>
            Tools
          </h2>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
            {Tools.map((tool) => (
              <SkillTemplate
                key={tool.id}
                id={tool.id}
                icon={tool.icon}
                skillName={tool.name}
              />
            ))}
          </div>
        </section>

        <section className='container flex flex-col items-center'>
          <h2 className='py-4 text-center text-textPrimary sm:py-8'>
            To Learn
          </h2>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-2'>
            {Learn.map((lesson) => (
              <SkillTemplate
                key={lesson.id}
                id={lesson.id}
                icon={lesson.icon}
                skillName={lesson.name}
              />
            ))}
          </div>
        </section>

        <section className='container flex flex-col items-center col-sstart-3'>
          <h2 className='py-4 text-center text-textPrimary sm:py-8'>
            Services
          </h2>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
            {Services.map((service) => (
              <SkillTemplate
                key={service.id}
                id={service.id}
                icon={service.icon}
                skillName={service.name}
              />
            ))}
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
}

export default Skills;
