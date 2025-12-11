import {
  SiCinema4D,
  SiGraphql,
} from 'react-icons/si';
// import { FaGit } from 'react-icons/fa';
// import { FcCommandLine } from 'react-icons/fc';
import { GrDocker } from 'react-icons/gr'
import { DiPostgresql } from 'react-icons/di';

import Eslint from "./icons/eslint";
import Corel from './icons/corel';
// import Turbopack from './icons/turbopack';
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
    description: 'Visual Studio Code is a free source-code editor made by Microsoft for Windows, Linux and macOS. Features include support for debugging, syntax highlighting, and version control.',
    proficiency: 95,
    officialSite: 'https://code.visualstudio.com/',
  },
  {
    id: 2,
    name: 'Git',
    // icon: <FaGit size={34} fill='#9C98B0' />,
    icon: <Git size={44} />,
    description: 'Git is a distributed version-control system for tracking changes in source code during software development. Designed by Linus Torvalds.',
    proficiency: 85,
    officialSite: 'https://git-scm.com/',
  },
  {
    id: 4,
    name: 'Adobe Photoshop',
    // icon: <SiAdobephotoshop size={32} fill='#9C98B0' />,
    icon: <Photoshop size={40} />,
    description: 'Adobe Photoshop is a raster graphics editor developed and published by Adobe Inc. Used for photo editing, digital art, and graphic design.',
    proficiency: 75,
    officialSite: 'https://www.adobe.com/products/photoshop.html',
  },
  {
    id: 5,
    name: 'Adobe Illustrator',
    // icon: <SiAdobeillustrator size={32} fill='#9C98B0' />,
    icon: <Illustrator size={40} />,
    description: 'Adobe Illustrator is a vector graphics editor and design program developed and marketed by Adobe Inc. Used for creating logos and illustrations.',
    proficiency: 70,
    officialSite: 'https://www.adobe.com/products/illustrator.html',
  },
  {
    id: 6,
    name: 'Cinema 4D',
    icon: <SiCinema4D size={32} fill='#9C98B0' />,
    description: 'Cinema 4D is a professional 3D modeling, animation, simulation and rendering software solution developed by Maxon Computer GmbH.',
    proficiency: 60,
    officialSite: 'https://www.maxon.net/en/cinema-4d',
  },
  {
    id: 7,
    name: 'CorelDRAW',
    icon: <Corel size={80} />,
    description: 'CorelDRAW is a vector graphics editor developed and marketed by Corel Corporation. Used for graphic design and page layout.',
    proficiency: 65,
    officialSite: 'https://www.coreldraw.com/',
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
    description: 'Figma is a vector graphics editor and prototyping tool which is primarily web-based, with additional offline features enabled by desktop applications.',
    proficiency: 80,
    officialSite: 'https://www.figma.com/',
  },
  {
    id: 10,
    name: 'ESLint',
    icon: <Eslint size={36} fill='#4A2EC4' fill2='#8181F2' />,
    description: 'ESLint is a static code analysis tool for identifying problematic patterns found in JavaScript code. Helps maintain code quality and consistency.',
    proficiency: 85,
    officialSite: 'https://eslint.org/',
  },
  {
    id: 11,
    name: 'GraphQL',
    icon: <SiGraphql size={36} fill='#E10098' />,
    description: 'GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. Developed by Facebook (Meta).',
    proficiency: 75,
    officialSite: 'https://graphql.org/',
  },
  {
    id: 12,
    name: 'PostgreSQL',
    icon: <DiPostgresql size={44} fill='#2F6792' />,
    description: 'PostgreSQL is a free and open-source relational database management system emphasizing extensibility and SQL compliance.',
    proficiency: 70,
    officialSite: 'https://www.postgresql.org/',
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
    description: 'Docker is a set of platform as a service products that deliver software in packages called containers. Enables consistent deployment across environments.',
    proficiency: 75,
    officialSite: 'https://www.docker.com/',
  }
];

export default Tools;

