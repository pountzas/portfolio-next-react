import Header from '../components/Header';
import Footer from '../components/Footer';

import Languages from '../components/Languages';
import Libraries from '../components/Libraries';
import Frameworks from '../components/Frameworks';
import Tools from '../components/Tools';

import Flip from 'react-reveal/Flip';
import config from 'react-reveal/globals';
import SkillTemplate from '../components/SkillTemplate';

config({ ssrFadeout: true });

function Skills() {
  return (
    <div className='bg-gray-700 min-h-screen'>
      <Header />
      <h1 className='text-blue-200 text-center font-semibold text-2xl pt-6 sm:pt-12'>
        My Skillset
      </h1>
      <div className='sm:grid grid-cols-3 gap-4 md:max-w-4xl lg:max-w-7xl pt-3 pb-12  mx-auto'>
        <section className='container flex flex-col items-center'>
          <h2 className='text-blue-200 text-center py-4 sm:py-8'>
            Programing Languages
          </h2>
          <div className='grid grid-cols-2 gap-4'>
            {Languages.map((language) => (
              <SkillTemplate
                key={language.id}
                icon={language.icon}
                skillName={language.name}
              />
            ))}
          </div>
        </section>

        <section className='container flex flex-col items-center'>
          <h2 className='text-blue-200 text-center py-4 sm:py-8'>
            Libraries & Frameworks
          </h2>
          <div className='grid grid-cols-2 gap-4'>
            {Libraries.map((library) => (
              <SkillTemplate
                key={library.id}
                icon={library.icon}
                skillName={library.name}
              />
            ))}
            {Frameworks.map((framework) => (
              <SkillTemplate
                key={framework.id}
                icon={framework.icon}
                skillName={framework.name}
              />
            ))}
          </div>
        </section>

        <section className='container flex flex-col items-center'>
          <h2 className='text-blue-200 text-center py-4 sm:py-8'>
            Tools and Services
          </h2>
          <div className='grid grid-cols-2 gap-4'>
            {Tools.map((tool) => (
              <SkillTemplate
                key={tool.id}
                icon={tool.icon}
                skillName={tool.name}
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
