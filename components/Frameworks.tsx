import { DiBootstrap } from 'react-icons/di';

import NextJs from './icons/nextJs';
import Rails from './icons/rails';
import Tailwind from './icons/tailwind';

interface Framework {
  id: string | number;
  name: string;
  icon: React.ReactElement;
}

const Frameworks: Framework[] = [
  {
    id: 1,
    name: 'Next.js',
    icon: <NextJs size={34} fill='#9C98B0' />,
  },
  {
    id: 2,
    name: 'Ruby on Rails',
    icon: <Rails size={44} fill='#CC0000' />,
  },
  {
    id: 3,
    name: 'Tailwind CSS',
    icon: <Tailwind size={38} fill='#9C98B0' />,
  },
  {
    id: 4,
    name: 'Bootstrap',
    icon: <DiBootstrap size={36} fill='#7710F1' />,
  }
];

export default Frameworks;

