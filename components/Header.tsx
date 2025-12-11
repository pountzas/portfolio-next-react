import React from 'react';
import { GiSkills } from 'react-icons/gi';
import { RiGitRepositoryLine } from 'react-icons/ri';
import { FaHome } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { flipOut } from './animations/pageAnimations';
import NavItem from './NavItem';

import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const router = useRouter();

  return (
    <motion.div
      className='sticky top-0 z-50 py-3 border-b shadow-sm border-borderSecondary bg-primary'
      variants={flipOut}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* left section */}
      <div className='flex justify-between mx-auto md:max-w-4xl xl:max-w-6xl '>
        <h1 className='px-3 font-semibold text-textPrimary md:px-0'>
          N<span className='hidden sm:inline-block'>ikos</span> P
          <span className='hidden sm:inline-block'>ountzas</span>
        </h1>

        {/* right section */}
        <div className='flex px-3 space-x-8 text-textTertiary md:px-0'>
          <NavItem
            label="Home"
            path="/"
            mobileIcon={<FaHome />}
            isActive={router.pathname === '/'}
            onClick={() => router.push('/')}
          />
          <NavItem
            label="Projects"
            path="/Projects"
            mobileIcon={<RiGitRepositoryLine />}
            isActive={router.pathname === '/Projects'}
            onClick={() => router.push('/Projects')}
          />
          <NavItem
            label="Skills"
            path="/Skills"
            mobileIcon={<GiSkills />}
            isActive={router.pathname === '/Skills'}
            onClick={() => router.push('/Skills')}
          />
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
    </motion.div>
  );
}

export default Header;
