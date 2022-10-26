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
import Eslint from "./icons/eslint";

const Tools = [
  {
    id: 1,
    name: 'Visual Studio Code',
    icon: <SiVisualstudiocode size={32} fill='#9C98B0' />,
  },
  {
    id: 2,
    name: 'Git',
    icon: <FaGit size={34} fill='#9C98B0' />,
  },
  {
    id: 4,
    name: 'Photoshop',
    icon: <SiAdobephotoshop size={32} fill='#9C98B0' />,
  },
  {
    id: 5,
    name: 'Illustrator',
    icon: <SiAdobeillustrator size={32} fill='#9C98B0' />,
  },
  {
    id: 6,
    name: 'Cinema 4D',
    icon: <SiCinema4D size={32} fill='#9C98B0' />,
  },
  // {
  //   id: 10,
  //   name: 'Command Line',
  //   icon: <FcCommandLine size={36} fill='#9C98B0' />,
  // },
  {
    id: 11,
    name: 'Figma',
    icon: <SiFigma size={32} fill='#9C98B0' />,
  },
  {
    id: 14,
    name: 'EsLint',
    icon: <Eslint size={36} fill='#373D42' fill2='#9C98B0' />,
  },
  {
    id: 15,
    name: 'GraphQL',
    icon: <SiGraphql size={36} />,
  },
];

export default Tools;
