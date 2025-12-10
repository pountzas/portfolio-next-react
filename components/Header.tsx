import React from 'react';
import { IoIosContact } from 'react-icons/io';
import { GiSkills } from 'react-icons/gi';
import { RiGitRepositoryLine } from 'react-icons/ri';
import { FaHome } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { flipOut } from './animations/pageAnimations';

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
          <motion.div
            className='cursor-pointer relative'
            onClick={() => router.push('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{
              scale: 0.95,
              transition: { type: "spring", stiffness: 400, damping: 17 }
            }}
            animate={{
              scale: router.pathname === '/' ? 1.08 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
          >
            {/* Active indicator line */}
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-textPrimary rounded-full"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: router.pathname === '/' ? 1 : 0,
                opacity: router.pathname === '/' ? 1 : 0,
                boxShadow: router.pathname === '/' ? '0 0 10px rgba(var(--color-text-primary-rgb), 0.5)' : 'none'
              }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                scaleX: { type: "spring", stiffness: 200, damping: 20 }
              }}
            />

            <motion.div
              className={`hidden md:block px-1 text-lg uppercase font-semibold transition-colors duration-300
              ${router.pathname === '/' ? 'text-textPrimary' : ''}`}
              animate={{
                textShadow: router.pathname === '/' ? '0 0 8px rgba(var(--color-text-primary-rgb), 0.4)' : 'none',
                y: router.pathname === '/' ? [0, -2, 0] : 0
              }}
              transition={{
                textShadow: { duration: 0.3 },
                y: {
                  duration: 0.6,
                  // repeat: router.pathname === '/' ? Infinity : 0,
                  // repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
            >
              Home
            </motion.div>
            <motion.div
              className={`text-2xl md:hidden transition-colors duration-300 ${router.pathname === '/' ? 'text-textPrimary' : ''
                }`}
              animate={{
                scale: router.pathname === '/' ? 1.1 : 1,
                textShadow: router.pathname === '/' ? '0 0 8px rgba(var(--color-text-primary-rgb), 0.3)' : 'none'
              }}
              transition={{ duration: 0.3 }}
            >
              <FaHome />
            </motion.div>
          </motion.div>
          <motion.div
            className='cursor-pointer relative'
            onClick={() => router.push('/Projects')}
            whileHover={{ scale: 1.05 }}
            whileTap={{
              scale: 0.95,
              transition: { type: "spring", stiffness: 400, damping: 17 }
            }}
            animate={{
              scale: router.pathname === '/Projects' ? 1.08 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
          >
            {/* Active indicator line */}
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-textPrimary rounded-full"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: router.pathname === '/Projects' ? 1 : 0,
                opacity: router.pathname === '/Projects' ? 1 : 0,
                boxShadow: router.pathname === '/Projects' ? '0 0 10px rgba(var(--color-text-primary-rgb), 0.5)' : 'none'
              }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                scaleX: { type: "spring", stiffness: 200, damping: 20 }
              }}
            />

            <motion.div
              className={`hidden md:block px-1 text-lg uppercase font-semibold transition-colors duration-300
              ${router.pathname === '/Projects' ? 'text-textPrimary' : ''}`}
              animate={{
                textShadow: router.pathname === '/Projects' ? '0 0 8px rgba(var(--color-text-primary-rgb), 0.4)' : 'none',
                y: router.pathname === '/Projects' ? [0, -2, 0] : 0
              }}
              transition={{
                textShadow: { duration: 0.3 },
                y: {
                  duration: 0.6,
                  // repeat: router.pathname === '/Projects' ? Infinity : 0,
                  // repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
            >
              Projects
            </motion.div>
            <motion.div
              className={`text-2xl md:hidden transition-colors duration-300 ${router.pathname === '/Projects' ? 'text-textPrimary' : ''
                }`}
              animate={{
                scale: router.pathname === '/Projects' ? 1.1 : 1,
                textShadow: router.pathname === '/Projects' ? '0 0 8px rgba(var(--color-text-primary-rgb), 0.3)' : 'none'
              }}
              transition={{ duration: 0.3 }}
            >
              <RiGitRepositoryLine />
            </motion.div>
          </motion.div>
          <motion.div
            className='cursor-pointer relative'
            onClick={() => router.push('/Skills')}
            whileHover={{ scale: 1.05 }}
            whileTap={{
              scale: 0.95,
              transition: { type: "spring", stiffness: 400, damping: 17 }
            }}
            animate={{
              scale: router.pathname === '/Skills' ? 1.08 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
          >
            {/* Active indicator line */}
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-textPrimary rounded-full"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: router.pathname === '/Skills' ? 1 : 0,
                opacity: router.pathname === '/Skills' ? 1 : 0,
                boxShadow: router.pathname === '/Skills' ? '0 0 10px rgba(var(--color-text-primary-rgb), 0.5)' : 'none'
              }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                scaleX: { type: "spring", stiffness: 200, damping: 20 }
              }}
            />

            <motion.div
              className={`hidden md:block px-1 text-lg uppercase font-semibold transition-colors duration-300
              ${router.pathname === '/Skills' ? 'text-textPrimary' : ''}`}
              animate={{
                textShadow: router.pathname === '/Skills' ? '0 0 8px rgba(var(--color-text-primary-rgb), 0.4)' : 'none',
                y: router.pathname === '/Skills' ? [0, -2, 0] : 0
              }}
              transition={{
                textShadow: { duration: 0.3 },
                y: {
                  duration: 0.6,
                  // repeat: router.pathname === '/Skills' ? Infinity : 0,
                  // repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
            >
              Skills
            </motion.div>
            <motion.div
              className={`text-2xl md:hidden transition-colors duration-300 ${router.pathname === '/Skills' ? 'text-textPrimary' : ''
                }`}
              animate={{
                scale: router.pathname === '/Skills' ? 1.1 : 1,
                textShadow: router.pathname === '/Skills' ? '0 0 8px rgba(var(--color-text-primary-rgb), 0.3)' : 'none'
              }}
              transition={{ duration: 0.3 }}
            >
              <GiSkills />
            </motion.div>
          </motion.div>
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
