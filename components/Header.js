import { IoIosContact } from 'react-icons/io';
import { GiSkills } from 'react-icons/gi';
import { RiGitRepositoryLine } from 'react-icons/ri';
import { FaHome } from 'react-icons/fa';

import { useRouter } from 'next/router';

function Header() {
  const router = useRouter();

  return (
    <div className='py-3 shadow-sm border-b bg-gray-800 sticky top-0 z-50 '>
      {/* left section */}
      <div className='flex justify-between md:max-w-3xl xl:max-w-6xl mx-auto '>
        <h1 className='px-3 text-gray-100 font-semibold'>Nikos Pountzas</h1>

        {/* right section */}
        <div className='flex space-x-8 px-3 text-gray-400'>
          <div onClick={() => router.push('/')}>
            <div className='hidden md:block px-1 text-lg uppercase font-semibold'>
              Home
            </div>
            <FaHome className='text-2xl md:hidden' />
          </div>
          <div onClick={() => router.push('/Projects')}>
            <div className='hidden md:block px-1 text-lg uppercase font-semibold'>
              Projects
            </div>
            <RiGitRepositoryLine className='text-2xl md:hidden' />
          </div>
          <div onClick={() => router.push('/Skills')}>
            <div className='hidden md:block px-1 text-lg uppercase font-semibold'>
              Skills
            </div>
            <GiSkills className='text-2xl md:hidden' />
          </div>
          <div onClick={() => router.push('/Contact')}>
            <div className='hidden md:block px-1 text-lg uppercase font-semibold'>
              Contact
            </div>
            <IoIosContact className='text-2xl md:hidden' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
