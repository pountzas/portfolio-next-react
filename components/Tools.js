import {
  SiVisualstudiocode,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiCinema4D,
} from 'react-icons/si';
import { FaGit } from 'react-icons/fa';
import { AiFillGithub } from 'react-icons/ai';

const Tools = [
  {
    id: 1,
    name: 'Visual Studio Code',
    icon: <SiVisualstudiocode />,
  },
  {
    id: 2,
    name: 'Git',
    icon: <FaGit />,
  },
  {
    id: 3,
    name: 'Github',
    icon: <AiFillGithub />,
  },
  {
    id: 4,
    name: 'Photoshop',
    icon: <SiAdobephotoshop />,
  },
  {
    id: 5,
    name: 'Illustrator',
    icon: <SiAdobeillustrator />,
  },
  {
    id: 6,
    name: 'Cinema 4D',
    icon: <SiCinema4D />,
  },
];

export default Tools;
