import { TbBrandReactNative } from 'react-icons/tb';
import ReactIcon from './icons/ReactIcon';
import Redux from './icons/redux';
import Recoil from './icons/recoil';
import MotionFramer from './icons/MotionFramer';
import NodeJs from './icons/NodeJs';
import { Library } from '../types';

const Libraries: Library[] = [
  {
    id: 1,
    name: 'React',
    icon: <ReactIcon fill='#61DAFB' size={32} />,
    description: 'React is a free and open-source front-end JavaScript library for building user interfaces based on components. Developed and maintained by Meta.',
    proficiency: 90,
    officialSite: 'https://react.dev/',
  },
  {
    id: 2,
    name: 'React Native',
    icon: <TbBrandReactNative color='#61DAFB' size={32} />,
    description: 'React Native is an open-source UI software framework created by Meta Platforms, Inc. It is used to develop applications for Android, iOS, Web and UWP.',
    proficiency: 70,
    officialSite: 'https://reactnative.dev/',
  },
  {
    id: 3,
    name: 'Node.js',
    icon: <NodeJs fill='#83CD29' size={36} />,
    description: 'Node.js is a cross-platform, open-source server environment that can run JavaScript code outside of a web browser. Built on Chrome\'s V8 JavaScript engine.',
    proficiency: 75,
    officialSite: 'https://nodejs.org/',
  },
  {
    id: 4,
    name: 'Redux',
    icon: <Redux fill='#764ABC' size={32} />,
    description: 'Redux is a predictable state container for JavaScript applications. It helps you write applications that behave consistently, run in different environments.',
    proficiency: 80,
    officialSite: 'https://redux.js.org/',
  },
  {
    id: 5,
    name: 'Recoil',
    icon: <Recoil fill='#286BD8' size={36} />,
    description: 'Recoil is an experimental state management library for React apps. It provides several capabilities that are difficult to achieve with React alone.',
    proficiency: 65,
    officialSite: 'https://recoiljs.org/',
  },
  {
    id: 6,
    name: 'Framer Motion',
    icon: <MotionFramer size={32} />,
    description: 'Framer Motion is a production-ready motion library for React. Use it to create animations and interactions that feel smooth and natural.',
    proficiency: 85,
    officialSite: 'https://www.framer.com/motion/',
  },
];

export default Libraries;

