import {
  SiVisualstudiocode,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiCinema4D,
  SiFirebase,
  SiNetlify,
  SiHeroku,
} from 'react-icons/si';
import { FaGit } from 'react-icons/fa';
import { AiFillGithub } from 'react-icons/ai';
import { FcCommandLine } from 'react-icons/fc';

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
  {
    id: 7,
    name: 'Firebase',
    icon: <SiFirebase />,
  },
  {
    id: 8,
    name: 'Netlify',
    icon: <SiNetlify />,
  },
  {
    id: 9,
    name: 'Heroku',
    icon: <SiHeroku />,
  },
  {
    id: 10,
    name: 'Command Line',
    icon: <FcCommandLine />,
  },
];

export default Tools;
