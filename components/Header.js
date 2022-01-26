import { IoHome, IoIosContact } from 'react-icons/io';
import { FcAboutUs } from 'react-icons/fc';
import { GiSkills } from 'react-icons/gi';
import { RiGitRepositoryLine } from 'react-icons/ri';

function Header() {
  return (
    <div className='flex shadow-sm border-b bg-white sticky top-0 z-50 '>
      {/* left section */}
      <div>left section</div>

      {/* right section */}
      <ul className='flex justify-between'>
        <li className='px-1'>Home</li>
        <li className='px-1'>About</li>
        <li className='px-1'>Projects</li>
        <li className='px-1'>Skills</li>
        <li className='px-1'>Contact</li>
      </ul>
    </div>
  );
}

export default Header;
