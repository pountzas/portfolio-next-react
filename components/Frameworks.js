import { DiBootstrap } from 'react-icons/di';
import { TbBrandAngular } from 'react-icons/tb';
import NextJs from './icons/nextJs';
import Rails from './icons/rails';
import Tailwind from './icons/tailwind';

const Frameworks = [
  {
    id: 1,
    name: 'Next.js',
    icon: <NextJs size={34} fill='#9C98B0' />,
  },
  {
    id: 2,
    name: 'Ruby on Rails',
    icon: <Rails size={44} fill='#9C98B0' />,
  },
  {
    id: 3,
    name: 'Tailwind CSS',
    icon: <Tailwind size={38} fill='#9C98B0' fill2='#373D42' />,
  },
  {
    id: 4,
    name: 'Bootstrap',
    icon: <DiBootstrap size={36} fill='#9C98B0' />,
  },
  // {
  //   id: 5,
  //   name: 'Angular',
  //   icon: <TbBrandAngular size={36} fill='#9C98B0' />,
  // },

];

export default Frameworks;
