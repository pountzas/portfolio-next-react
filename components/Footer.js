import Socials from './Socials';
import Link from 'next/link';

function Footer() {
  return (
    <div>
      <h1>footer</h1>
      <div className='flex items-center justify-center'>
        {Socials.map((social) => (
          <div key={social.id}>
            <Link href={social.path} passHref>
              <a target='_blank'>{social.icon}</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Footer;
