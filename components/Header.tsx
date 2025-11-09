import React from 'react';
import { IoIosContact } from 'react-icons/io';
import { GiSkills } from 'react-icons/gi';
import { RiGitRepositoryLine } from 'react-icons/ri';
import { FaHome } from 'react-icons/fa';

import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const router = useRouter();

  return (
    <div className='sticky top-0 z-50 py-3 border-b shadow-sm border-borderSecondary bg-primary '>
      {/* left section */}
      <div className='flex justify-between mx-auto md:max-w-4xl xl:max-w-6xl '>
        <h1 className='px-3 font-semibold text-textPrimary md:px-0'>
          N<span className='hidden sm:inline-block'>ikos</span> P
          <span className='hidden sm:inline-block'>ountzas</span>
        </h1>

        {/* right section */}
        <div className='flex px-3 space-x-8 text-textTertiary md:px-0'>
          <div className='cursor-pointer' onClick={() => router.push('/')}>
            <div
              className={`hidden md:block px-1 text-lg uppercase font-semibold
              ${router.pathname === '/' ? 'text-textPrimary' : ''}`}
            >
              Home
            </div>
            <FaHome
              className={`text-2xl md:hidden ${router.pathname === '/' ? 'text-textPrimary' : ''
                }`}
            />
          </div>
          <div
            className='cursor-pointer'
            onClick={() => router.push('/Projects')}
          >
            <div
              className={`hidden md:block px-1 text-lg uppercase font-semibold
              ${router.pathname === '/Projects' ? 'text-textPrimary' : ''}`}
            >
              Projects
            </div>
            <RiGitRepositoryLine
              className={`text-2xl md:hidden ${router.pathname === '/Projects' ? 'text-textPrimary' : ''
                }`}
            />
          </div>
          <div
            className='cursor-pointer'
            onClick={() => router.push('/Skills')}
          >
            <div
              className={`hidden md:block px-1 text-lg uppercase font-semibold
              ${router.pathname === '/Skills' ? 'text-textPrimary' : ''}`}
            >
              Skills
            </div>
            <GiSkills
              className={`text-2xl md:hidden ${router.pathname === '/Skills' ? 'text-textPrimary' : ''
                }`}
            />
          </div>
          {/* <div
            className='cursor-pointer'
            onClick={() => router.push('/Contact')}
          >
            <div
              className={`hidden md:block text-lg uppercase font-semibold
              ${router.pathname === '/Contact' ? 'text-textPrimary' : ''}`}
            >
              Contact
            </div>
            <IoIosContact
              className={`text-2xl md:hidden ${
                router.pathname === '/Contact' ? 'text-textPrimary' : ''
              }`}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
