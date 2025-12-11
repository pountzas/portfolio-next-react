import { SiWeb3Dotjs, SiSolidity, SiThreedotjs } from 'react-icons/si';
import Ether from './icons/ether';
import Solidity from './icons/Solidity';
import Web3 from './icons/Web3';

interface LearningItem {
  id: string | number;
  name: string;
  icon: React.ReactElement;
  description: string;
  proficiency: number;
}

const Learn: LearningItem[] = [
  {
    id: 1,
    name: 'Web3.js',
    // icon: <SiWeb3Dotjs fill='#9C98B0' size={36} />,
    icon: <Web3 size={40} />,
    description: 'JavaScript library for interacting with the Ethereum blockchain and building decentralized applications.',
    proficiency: 25,
  },
  {
    id: 2,
    name: 'Solidity',
    // icon: <SiSolidity fill='#9C98B0' size={36} />,
    icon: <Solidity fill='#9C98B0' size={64} />,
    description: 'Object-oriented programming language for implementing smart contracts on blockchain platforms.',
    proficiency: 20,
  },
  {
    id: 3,
    name: 'Ether.js',
    icon: <Ether fill='#24339B' size={36} />,
    description: 'Complete Ethereum library and wallet implementation in JavaScript for blockchain interaction.',
    proficiency: 30,
  },
  {
    id: 4,
    name: 'Three.js',
    icon: <SiThreedotjs fill='#9C98B0' size={36} />,
    description: 'Cross-browser JavaScript library and API for creating and displaying animated 3D computer graphics.',
    proficiency: 35,
  }
];

export default Learn;
