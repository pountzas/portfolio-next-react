import { SiWeb3Dotjs, SiSolidity, SiThreedotjs } from 'react-icons/si';
import Ether from './icons/ether';
import Solidity from './icons/Solidity';
import Web3 from './icons/Web3';

const Learn = [
  {
    id: 1,
    name: 'Web3.js',
    // icon: <SiWeb3Dotjs fill='#9C98B0' size={36} />,
    icon: <Web3 size={40} />,
  },
  {
    id: 2,
    name: 'Solidity',
    // icon: <SiSolidity fill='#9C98B0' size={36} />,
    icon: <Solidity fill='#9C98B0' size={64} />,
  },
  {
    id: 3,
    name: 'Ether.js',
    icon: <Ether fill='#24339B' size={36} />,
  },
  {
    id: 4,
    name: 'Three.js',
    icon: <SiThreedotjs fill='#9C98B0' size={36} />,
  }
];

export default Learn;