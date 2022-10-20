import { DiBootstrap } from 'react-icons/di';
import NextJs from './icons/nextJs';
import Rails from './icons/rails';
import Tailwind from './icons/tailwind';

const Frameworks = [
  {
    id: 1,
    name: 'Next.js',
    icon: <NextJs size={34} />,
  },
  {
    id: 2,
    name: 'Ruby on Rails',
    icon: <Rails size={44} />,
  },
  {
    id: 3,
    name: 'Tailwind CSS',
    icon: <Tailwind />,
  },
  {
    id: 4,
    name: 'Bootstrap',
    icon: <DiBootstrap />,
  },
];

export default Frameworks;
