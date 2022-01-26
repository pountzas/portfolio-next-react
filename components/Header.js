import { IoIosContact } from 'react-icons/io';
import { GiSkills } from 'react-icons/gi';
import { RiGitRepositoryLine } from 'react-icons/ri';
import { FaHome } from 'react-icons/fa';

function Header() {
  return (
    <div className='flex shadow-sm border-b bg-white sticky top-0 z-50 '>
      {/* left section */}
      <h1>Nikos Pountzas</h1>

      {/* right section */}
      <ul className='flex justify-between text-gray-500'>
        <li className='hidden md:block px-1 text-lg uppercase font-semibold'>
          Home
        </li>
        <FaHome className='text-2xl md:hidden' />
        <li className='hidden md:block px-1 text-lg uppercase font-semibold'>
          Projects
        </li>
        <RiGitRepositoryLine className='text-2xl md:hidden' />
        <li className='hidden md:block px-1 text-lg uppercase font-semibold'>
          Skills
        </li>
        <GiSkills className='text-2xl md:hidden' />
        <li className='hidden md:block px-1 text-lg uppercase font-semibold'>
          Contact
        </li>
        <IoIosContact className='text-2xl md:hidden' />
      </ul>
    </div>
  );
}

export default Header;
