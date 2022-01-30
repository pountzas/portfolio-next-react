import Header from '../components/Header';
import Languages from '../components/Languages';
import Libraries from '../components/Libraries';
import Frameworks from '../components/Frameworks';
import Tools from '../components/Tools';

function Skills() {
  return (
    <div className='bg-gray-900 min-h-screen '>
      <Header />
      <h1 className='text-gray-200 text-center font-semibold text-2xl p-3'>
        My Skillset
      </h1>
      <div className='sm:flex justify-between md:max-w-3xl xl:max-w-7xl mx-auto'>
        <section className='container'>
          <div className='grid grid-cols-2 gap-2 place-items-center '>
            {Languages.map((language) => (
              <div
                className='flex justify-center border w-16 h-16 md:w-20 md:h-20 items-center m-2 p-2 rounded-md text-gray-500'
                key={language.id}
              >
                <div className='text-3xl md:text-5xl'>
                  {language.icon}
                  {/* <span className=' opacity-0 hover:opacity-100 duration-300  inset-0 z-10 flex justify-center items-center text-white font-semibold'>
                    {language.name}
                  </span> */}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className='container'>
          <div className='grid grid-cols-2 gap-2 place-items-center '>
            {Libraries.map((library) => (
              <div
                className='flex justify-center border w-16 h-16 md:w-20 md:h-20 items-center m-2 p-2 rounded-md text-gray-500'
                key={library.id}
              >
                <div className='text-3xl md:text-5xl'>
                  {library.icon}
                  {/* <span className=' opacity-0 hover:opacity-100 duration-300  inset-0 z-10 flex justify-center items-center text-white font-semibold'>
                    {library.name}
                  </span> */}
                </div>
              </div>
            ))}
          </div>
          <div className='pt-2 grid grid-cols-2 gap-2 place-items-center '>
            {Frameworks.map((framework) => (
              <div
                className='flex justify-center border w-16 h-16 md:w-20 md:h-20 items-center m-2 p-2 rounded-md text-gray-500'
                key={framework.id}
              >
                <div className='text-3xl md:text-5xl'>
                  {framework.icon}
                  {/* <span className=' opacity-0 hover:opacity-100 duration-300  inset-0 z-10 flex justify-center items-center text-white font-semibold'>
                    {framework.name}
                  </span> */}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className='container'>
          <div className='grid grid-cols-2 gap-2 place-items-center '>
            {Tools.map((tool) => (
              <div
                className='flex justify-center border w-16 h-16 md:w-20 md:h-20 items-center m-2 p-2 rounded-md text-gray-500'
                key={tool.id}
              >
                <div className='text-3xl md:text-5xl'>
                  {tool.icon}
                  {/* <span className=' opacity-0 hover:opacity-100 duration-300  inset-0 z-10 flex justify-center items-center text-white font-semibold'>
                    {tool.name}
                  </span> */}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Skills;
