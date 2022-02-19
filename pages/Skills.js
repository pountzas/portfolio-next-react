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
          </div>
          <div className='grid grid-cols-2 gap-4 pt-4'>
            {Frameworks.map((framework) => (
              <div
                className='flex justify-center bg-gray-900 border border-blue-300 hover:border-blue-900 w-16 h-16 md:w-20 md:h-20 items-center m-2 p-2 rounded-md text-gray-500 hover:text-blue-400 hover:bg-gray-800 ease-in-out duration-400 shadow-lg shadow-blue-500/50 hover:shadow-blue-900/50'
                key={framework.id}
              >
                <div className='relative group-hover:opacity-100'>
                  <Flip duration={2000} left cascade>
                    <div className='text-3xl md:text-5xl'>{framework.icon}</div>
                  </Flip>
                  <span className='absolute inset-0 z-10 -top-10 opacity-0 hover:opacity-100 flex justify-center text-blue-300 text-sm font-semibold whitespace-nowrap'>
                    {framework.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className='container flex flex-col items-center'>
          <h2 className='text-blue-200 text-center py-4 sm:py-8'>
            Tools and Software
          </h2>
          <div className='grid grid-cols-2 gap-4'>
            {Tools.map((tool) => (
              <div
                className='flex justify-center bg-gray-900 border border-blue-300 hover:border-blue-900 w-16 h-16 md:w-20 md:h-20 items-center m-2 p-2 rounded-md text-gray-500 hover:text-blue-400 hover:bg-gray-800 ease-in-out duration-400 shadow-lg shadow-blue-500/50 hover:shadow-blue-900/50'
                key={tool.id}
              >
                <div className='relative group-hover:opacity-100'>
                  <Flip duration={2000} left cascade>
                    <div className='text-3xl md:text-5xl'>{tool.icon}</div>
                  </Flip>
                  <span className='absolute inset-0 z-10 -top-10 opacity-0 hover:opacity-100 flex justify-center text-blue-300 text-sm font-semibold whitespace-nowrap'>
                    {tool.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Skills;
