import { TbBrandReactNative } from 'react-icons/tb';
import ReactIcon from './icons/ReactIcon';
import Redux from './icons/redux';
import Recoil from './icons/recoil';
import MotionFramer from './icons/MotionFramer';

const Libraries = [
  {
    id: 1,
    name: 'React',
    icon: <ReactIcon fill='#61DAFB' size={36} />,
  },
  {
    id: 2,
    name: 'React Native',
    icon: <TbBrandReactNative color='#61DAFB' size={36} />,
  },
  {
    id: 3,
    name: 'Redux',
    icon: <Redux fill='#764ABC' size={36} />,
  },
  {
    id: 4,
    name: 'Recoil',
    icon: <Recoil fill='#286BD8' size={36} />,
  },
  {
    id: 5,
    name: 'Motion Framer',
    icon: <MotionFramer size={36} />,
  },
];

export default Libraries;
