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
  description: string;
  proficiency: number;
}

const Libraries: Library[] = [
  {
    id: 1,
    name: 'React',
    icon: <ReactIcon fill='#61DAFB' size={32} />,
    description: 'Component-based JavaScript library for building interactive user interfaces with virtual DOM.',
    proficiency: 90,
  },
  {
    id: 2,
    name: 'React Native',
    icon: <TbBrandReactNative color='#61DAFB' size={32} />,
    description: 'Framework for building native mobile apps using React and JavaScript for cross-platform development.',
    proficiency: 70,
  },
  {
    id: 3,
    name: 'Node.js',
    icon: <NodeJs fill='#83CD29' size={36} />,
    description: 'JavaScript runtime built on Chrome\'s V8 engine for server-side and networking applications.',
    proficiency: 75,
  },
  {
    id: 4,
    name: 'Redux',
    icon: <Redux fill='#764ABC' size={32} />,
    description: 'Predictable state container for JavaScript applications, managing complex application state.',
    proficiency: 80,
  },
  {
    id: 5,
    name: 'Recoil',
    icon: <Recoil fill='#286BD8' size={36} />,
    description: 'State management library for React applications with simple and flexible API design.',
    proficiency: 65,
  },
  {
    id: 6,
    name: 'Motion Framer',
    icon: <MotionFramer size={32} />,
    description: 'Production-ready motion library for React, powering sophisticated animations and gestures.',
    proficiency: 85,
  },
];

export default Libraries;

