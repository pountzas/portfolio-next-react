import React from 'react';
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterSquare,
  AiFillFacebook,
} from 'react-icons/ai';

export interface SocialItem {
  id: number;
  name: string;
  path: string;
  icon: React.JSX.Element;
}

const Socials: SocialItem[] = [
  {
    id: 1,
    name: 'Github',
    path: 'https://github.com/pountzas',
    icon: <AiFillGithub />,
  },
  {
    id: 2,
    name: 'LinkedIn',
    path: 'https://www.linkedin.com/in/nikos-pountzas/',
    icon: <AiFillLinkedin />,
  },
  {
    id: 3,
    name: 'FaceBook',
    path: 'https://www.facebook.com/pountzas.nikos/',
    icon: <AiFillFacebook />,
  },
  {
    id: 4,
    name: 'Twitter',
    path: 'https://twitter.com/pountzas20',
    icon: <AiFillTwitterSquare />,
  },
];

export default Socials;
