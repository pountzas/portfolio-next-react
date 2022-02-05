import { FaReact, FaRecoil } from 'react-icons/fa';
import { SiRedux } from 'react-icons/si';
import { recoil } from './customIcons/recoil';

const Libraries = [
  {
    id: 1,
    name: 'React',
    icon: <FaReact />,
  },
  {
    id: 2,
    name: 'Redux',
    icon: <SiRedux />,
  },
  {
    id: 3,
    name: 'Recoil',
    icon: <FaRecoil />,
  },
  // {
  //   id: 4,
  //   name: 'React Native',
  // },
];

export default Libraries;
