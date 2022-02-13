import { IoIosContact } from 'react-icons/io';
import { GiSkills } from 'react-icons/gi';
import { RiGitRepositoryLine } from 'react-icons/ri';
import { FaHome } from 'react-icons/fa';

import { useRouter } from 'next/router';

function Header() {
  const router = useRouter();

  return (
    <div className='py-3 shadow-sm border-b border-blue-200 bg-gray-900 sticky top-0 z-50 '>
      {/* left section */}
      <div className='flex justify-between md:max-w-4xl xl:max-w-6xl mx-auto '>
        <h1 className='px-3 md:px-0 text-blue-200 font-semibold'>
          N<span className='hidden sm:inline-block'>ikos</span> P
          <span className='hidden sm:inline-block'>ountzas</span>
        </h1>

        {/* right section */}
        <div className='flex space-x-8 px-3 md:px-0 text-gray-400'>
          <div className='cursor-pointer' onClick={() => router.push('/')}>
            <div
              className={`hidden md:block px-1 text-lg uppercase font-semibold 
              ${router.pathname === '/' ? 'text-blue-200' : ''}`}
            >
              Home
            </div>
            <FaHome
              className={`text-2xl md:hidden ${
                router.pathname === '/' ? 'text-blue-200' : ''
              }`}
            />
          </div>
          <div
            className='cursor-pointer'
            onClick={() => router.push('/Projects')}
          >
            <div
              className={`hidden md:block px-1 text-lg uppercase font-semibold 
              ${router.pathname === '/Projects' ? 'text-blue-200' : ''}`}
            >
              Projects
            </div>
            <RiGitRepositoryLine
              className={`text-2xl md:hidden ${
                router.pathname === '/Projects' ? 'text-blue-200' : ''
              }`}
            />
          </div>
          <div
            className='cursor-pointer'
            onClick={() => router.push('/Skills')}
          >
            <div
              className={`hidden md:block px-1 text-lg uppercase font-semibold 
              ${router.pathname === '/Skills' ? 'text-blue-200' : ''}`}
            >
              Skills
            </div>
            <GiSkills
              className={`text-2xl md:hidden ${
                router.pathname === '/Skills' ? 'text-blue-200' : ''
              }`}
            />
          </div>
          {/* <div
            className='cursor-pointer'
            onClick={() => router.push('/Contact')}
          >
            <div
              className={`hidden md:block text-lg uppercase font-semibold 
              ${router.pathname === '/Contact' ? 'text-blue-200' : ''}`}
            >
              Contact
            </div>
            <IoIosContact
              className={`text-2xl md:hidden ${
                router.pathname === '/Contact' ? 'text-blue-200' : ''
              }`}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
