import React from 'react';
import Socials, { SocialItem } from './Socials';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <div className='fixed z-[100] bottom-0 min-w-full border-t border-borderSecondary bg-primary'>
      <div className='flex items-center justify-between mx-auto text-textTertiary md:max-w-4xl xl:max-w-6xl'>
        <div className='hidden md:block'>
          Designed and Developed by Pountzas Nikos
        </div>
        <div>Copyright © 2022 - {new Date().getFullYear()} NP</div>
        <div className='flex items-center justify-center py-2 space-x-2'>
          {Socials.map((social: SocialItem) => (
            <div key={social.id}>
              <Link target={'_blank'} href={social.path} passHref>
                <div className='text-2xl'>
                  {social.icon}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Footer;
