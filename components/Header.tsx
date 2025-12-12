import { motion } from 'framer-motion';
import { flipOut } from './animations/pageAnimations';

import NavItem from './NavItem';
import { useNavGroup } from './NavGroup';

const Header: React.FC = () => {
  const navItems = useNavGroup();

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
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              label={item.label}
              path={item.path}
              mobileIcon={item.icon}
              isActive={item.isActive}
              onClick={item.onClick}
            />
          ))}
         
        </div>
      </div>
    </motion.div>
  );
}

export default Header;
