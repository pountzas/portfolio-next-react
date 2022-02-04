import React from 'react';
import Socials from './Socials';
import Link from 'next/link';

function Footer() {
  return (
    <div>
      <h1>footer</h1>
      <div className='flex items-center justify-center'>
        {Socials.map((social) => (
          <div href={social.url} key={social.id} className=''>
            <a className='text-gray-800' href={social.url}>
              {social.icon}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Footer;
