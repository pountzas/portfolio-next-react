import { DiBootstrap } from 'react-icons/di';

import NextJs from './icons/nextJs';
import Rails from './icons/rails';
import Tailwind from './icons/tailwind';
import { Framework } from '../types';

const Frameworks: Framework[] = [
  {
    id: 1,
    name: 'Next.js',
    icon: <NextJs size={34} fill='#9C98B0' />,
    description: 'Next.js is a React framework that enables functionality such as server-side rendering and generating static websites for React-based web applications.',
    proficiency: 85,
    officialSite: 'https://nextjs.org/',
  },
  {
    id: 2,
    name: 'Ruby on Rails',
    icon: <Rails size={44} fill='#CC0000' />,
    description: 'Ruby on Rails is a server-side web application framework written in Ruby. It follows the model–view–controller (MVC) architectural pattern.',
    proficiency: 70,
    officialSite: 'https://rubyonrails.org/',
  },
  {
    id: 3,
    name: 'Tailwind CSS',
    icon: <Tailwind size={38} fill='#9C98B0' />,
    description: 'A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup. Rapidly build modern websites.',
    proficiency: 90,
    officialSite: 'https://tailwindcss.com/',
  },
  {
    id: 4,
    name: 'Bootstrap',
    icon: <DiBootstrap size={36} fill='#7710F1' />,
    description: 'Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. Includes HTML, CSS and JavaScript.',
    proficiency: 80,
    officialSite: 'https://getbootstrap.com/',
  }
];

export default Frameworks;

