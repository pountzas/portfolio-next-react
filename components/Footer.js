import Socials from './Socials';
import Link from 'next/link';

function Footer() {
  return (
        <div>Designed and Developed by Pountzas Nikos</div>
        <div>Copyright © 2022 NP</div>
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
    </div>
  );
}

export default Footer;
