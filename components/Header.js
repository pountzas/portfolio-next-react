import { IoIosContact } from 'react-icons/io';
import { GiSkills } from 'react-icons/gi';
import { RiGitRepositoryLine } from 'react-icons/ri';
import { FaHome } from 'react-icons/fa';

import { useRouter } from 'next/router';

function Header() {
  const router = useRouter();

  return (
    <div className='flex shadow-sm border-b bg-white sticky top-0 z-50 '>
      {/* left section */}
      <h1>Nikos Pountzas</h1>

      {/* right section */}
      <ul className='flex justify-between text-gray-500'>
        <li onClick={() => router.push('/')}>
          <div className='hidden md:block px-1 text-lg uppercase font-semibold'>
            Home
          </div>
          <FaHome className='text-2xl md:hidden' />
        </li>
        <li onClick={() => router.push('/Projects')}>
          <div className='hidden md:block px-1 text-lg uppercase font-semibold'>
            Projects
          </div>
          <RiGitRepositoryLine className='text-2xl md:hidden' />
        </li>
        <li onClick={() => router.push('/Skills')}>
          <div className='hidden md:block px-1 text-lg uppercase font-semibold'>
            Skills
          </div>
          <GiSkills className='text-2xl md:hidden' />
        </li>
        <li onClick={() => router.push('/Contact')}>
          <div className='hidden md:block px-1 text-lg uppercase font-semibold'>
            Contact
          </div>
          <IoIosContact className='text-2xl md:hidden' />
        </li>
      </ul>
    </div>
  );
}

export default Header;
