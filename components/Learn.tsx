import { SiThreedotjs } from 'react-icons/si';
import Ether from './icons/ether';
import Solidity from './icons/Solidity';
import Web3 from './icons/Web3';
import { LearningItem } from '../types';

const Learn: LearningItem[] = [
  {
    id: 1,
    name: 'Web3.js',
    // icon: <SiWeb3Dotjs fill='#9C98B0' size={36} />,
    icon: <Web3 size={40} />,
    description: 'Web3.js is a collection of libraries that allow you to interact with a local or remote Ethereum node using HTTP, IPC or WebSocket.',
    proficiency: 25,
    officialSite: 'https://web3js.readthedocs.io/',
  },
  {
    id: 2,
    name: 'Solidity',
    // icon: <SiSolidity fill='#9C98B0' size={36} />,
    icon: <Solidity fill='#9C98B0' size={64} />,
    description: 'Solidity is an object-oriented programming language for implementing smart contracts on various blockchain platforms, most notably Ethereum.',
    proficiency: 20,
    officialSite: 'https://soliditylang.org/',
  },
  {
    id: 3,
    name: 'Ethers.js',
    icon: <Ether fill='#24339B' size={36} />,
    description: 'The ethers.js library aims to be a complete and compact library for interacting with the Ethereum Blockchain and its ecosystem.',
    proficiency: 30,
    officialSite: 'https://docs.ethers.org/',
  },
  {
    id: 4,
    name: 'Three.js',
    icon: <SiThreedotjs fill='#9C98B0' size={36} />,
    description: 'Three.js is a cross-browser JavaScript library and application programming interface used to create and display animated 3D computer graphics in a web browser.',
    proficiency: 35,
    officialSite: 'https://threejs.org/',
  }
];

export default Learn;
