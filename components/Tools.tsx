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
import { Tool } from '../types';

const Tools: Tool[] = [
  {
    id: 1,
    name: 'Visual Studio Code',
    // icon: <VSc size={32} fill='#9C98B0' />,
    icon: <VScode size={40} />,
    description: 'Modern code editor with integrated Git, debugging, and extensive plugin ecosystem for development productivity.',
    proficiency: 95,
  },
  {
    id: 2,
    name: 'Git',
    // icon: <FaGit size={34} fill='#9C98B0' />,
    icon: <Git size={44} />,
    description: 'Distributed version control system for tracking changes in source code during software development.',
    proficiency: 85,
  },
  {
    id: 4,
    name: 'Photoshop',
    // icon: <SiAdobephotoshop size={32} fill='#9C98B0' />,
    icon: <Photoshop size={40} />,
    description: 'Industry-standard raster graphics editor for photo editing, digital art, and UI design.',
    proficiency: 75,
  },
  {
    id: 5,
    name: 'Illustrator',
    // icon: <SiAdobeillustrator size={32} fill='#9C98B0' />,
    icon: <Illustrator size={40} />,
    description: 'Vector graphics editor for creating logos, illustrations, and scalable graphics for print and digital media.',
    proficiency: 70,
  },
  {
    id: 6,
    name: 'Cinema 4D',
    icon: <SiCinema4D size={32} fill='#9C98B0' />,
    description: 'Professional 3D modeling, animation, and rendering software for motion graphics and visual effects.',
    proficiency: 60,
  },
  {
    id: 7,
    name: 'Corel Draw',
    icon: <Corel size={80} />,
    description: 'Vector illustration and page layout software for professional graphic design and printing.',
    proficiency: 65,
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
    description: 'Collaborative interface design tool for creating, prototyping, and sharing user interface designs.',
    proficiency: 80,
  },
  {
    id: 10,
    name: 'EsLint',
    icon: <Eslint size={36} fill='#4A2EC4' fill2='#8181F2' />,
    description: 'Static code analysis tool for identifying and fixing problems in JavaScript and TypeScript code.',
    proficiency: 85,
  },
  {
    id: 11,
    name: 'GraphQL',
    icon: <SiGraphql size={36} fill='#E10098' />,
    description: 'Query language for APIs that allows clients to request exactly the data they need, making APIs more efficient.',
    proficiency: 75,
  },
  {
    id: 12,
    name: 'PostgreSQL',
    icon: <DiPostgresql size={44} fill='#2F6792' />,
    description: 'Advanced open-source relational database with robust features for complex data management and analytics.',
    proficiency: 70,
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
    description: 'Platform for developing, shipping, and running applications in containers for consistent deployment.',
    proficiency: 75,
  }
];

export default Tools;

