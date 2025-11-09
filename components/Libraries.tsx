import { TbBrandReactNative } from 'react-icons/tb';
import ReactIcon from './icons/ReactIcon';
import Redux from './icons/redux';
import Recoil from './icons/recoil';
import MotionFramer from './icons/MotionFramer';
import NodeJs from './icons/NodeJs';

interface Library {
  id: string | number;
  name: string;
  icon: React.ReactElement;
}

const Libraries: Library[] = [
  {
    id: 1,
    name: 'React',
    icon: <ReactIcon fill='#61DAFB' size={32} />,
  },
  {
    id: 2,
    name: 'React Native',
    icon: <TbBrandReactNative color='#61DAFB' size={32} />,
  },
  {
    id: 3,
    name: 'Node.js',
    icon: <NodeJs fill='#83CD29' size={36} />,
  },
  {
    id: 4,
    name: 'Redux',
    icon: <Redux fill='#764ABC' size={32} />,
  },
  {
    id: 5,
    name: 'Recoil',
    icon: <Recoil fill='#286BD8' size={36} />,
  },
  {
    id: 6,
    name: 'Motion Framer',
    icon: <MotionFramer size={32} />,
  },
];

export default Libraries;

