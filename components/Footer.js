import Socials from './Socials';
import Link from 'next/link';

function Footer() {
  return (
    <div className='bg-gray-900 bottom-0 min-w-full fixed border-t border-blue-200'>
      <div className='md:max-w-4xl xl:max-w-6xl mx-auto text-blue-200 flex justify-between items-center'>
        <div>Designed and Developed by Pountzas Nikos</div>
        <div>Copyright © 2022 NP</div>
        <div className='flex items-center justify-center space-x-2 py-2'>
          {Socials.map((social) => (
            <div key={social.id}>
              <Link href={social.path} passHref>
                <a className='text-2xl' target='_blank'>
                  {social.icon}
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Footer;
