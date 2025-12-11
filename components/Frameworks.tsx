import { DiBootstrap } from 'react-icons/di';

import NextJs from './icons/nextJs';
import Rails from './icons/rails';
import Tailwind from './icons/tailwind';

interface Framework {
  id: string | number;
  name: string;
  icon: React.ReactElement;
  description: string;
  proficiency: number;
}

const Frameworks: Framework[] = [
  {
    id: 1,
    name: 'Next.js',
    icon: <NextJs size={34} fill='#9C98B0' />,
    description: 'React framework for production with server-side rendering, static site generation, and optimized performance.',
    proficiency: 85,
  },
  {
    id: 2,
    name: 'Ruby on Rails',
    icon: <Rails size={44} fill='#CC0000' />,
    description: 'Full-stack web framework that emphasizes convention over configuration and rapid application development.',
    proficiency: 70,
  },
  {
    id: 3,
    name: 'Tailwind CSS',
    icon: <Tailwind size={38} fill='#9C98B0' />,
    description: 'Utility-first CSS framework for rapidly building custom user interfaces with consistent design systems.',
    proficiency: 90,
  },
  {
    id: 4,
    name: 'Bootstrap',
    icon: <DiBootstrap size={36} fill='#7710F1' />,
    description: 'Popular CSS framework providing responsive grid system, components, and JavaScript plugins.',
    proficiency: 80,
  }
];

export default Frameworks;

