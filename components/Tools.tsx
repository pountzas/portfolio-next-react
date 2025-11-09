import {
  SiVisualstudiocode,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiCinema4D,
  SiFigma,
  SiGraphql,
} from 'react-icons/si';
import { FaGit } from 'react-icons/fa';
import { FcCommandLine } from 'react-icons/fc';
import { GrDocker } from 'react-icons/gr'
import { DiPostgresql } from 'react-icons/di';

import Eslint from "./icons/eslint";
import Corel from './icons/corel';
import Turbopack from './icons/turbopack';
import VScode from './icons/VScode';
import Git from './icons/Git';
import Photoshop from './icons/Photoshop';
import Illustrator from './icons/Illustrator';
import Figma from './icons/Figma';

interface Tool {
  id: string | number;
  name: string;
  icon: React.ReactElement;
}

const Tools: Tool[] = [
  {
    id: 1,
    name: 'Visual Studio Code',
    // icon: <VSc size={32} fill='#9C98B0' />,
    icon: <VScode size={40} />,
  },
  {
    id: 2,
    name: 'Git',
    // icon: <FaGit size={34} fill='#9C98B0' />,
    icon: <Git size={44} />,
  },
  {
    id: 4,
    name: 'Photoshop',
    // icon: <SiAdobephotoshop size={32} fill='#9C98B0' />,
    icon: <Photoshop size={40} />,
  },
  {
    id: 5,
    name: 'Illustrator',
    // icon: <SiAdobeillustrator size={32} fill='#9C98B0' />,
    icon: <Illustrator size={40} />,
  },
  {
    id: 6,
    name: 'Cinema 4D',
    icon: <SiCinema4D size={32} fill='#9C98B0' />,
  },
  {
    id: 7,
    name: 'Corel Draw',
    icon: <Corel size={80} />,
  },
  // {
  //   id: 8,
  //   name: 'Command Line',
  //   icon: <FcCommandLine size={36} fill='#9C98B0' />,
  // },
  {
    id: 9,
    name: 'Figma',
    // icon: <SiFigma size={32} fill='#9C98B0' />,
    icon: <Figma size={40} />,
  },
  {
    id: 10,
    name: 'EsLint',
    icon: <Eslint size={36} fill='#4A2EC4' fill2='#8181F2' />,
  },
  {
    id: 11,
    name: 'GraphQL',
    icon: <SiGraphql size={36} fill='#E10098' />,
  },
  {
    id: 12,
    name: 'PostgreSQL',
    icon: <DiPostgresql size={44} fill='#2F6792' />,
  },
  // {
  //   id: 13,
  //   name: 'TurboPack',
  //   icon: <Turbopack size={36} fill='#373D42' fill2='' fill3='#9C98B0' />,
  // },
  {
    id: 14,
    name: 'Docker',
    icon: <GrDocker size={40} fill="#2497ED" />,
  }
];

export default Tools;

