import { AiFillGithub } from "react-icons/ai";
import { SiHeroku, SiNetlify } from "react-icons/si";
import { TbBrandVercel } from "react-icons/tb";

import Bitbucket from "./icons/Bitbucket";
import Confluence from "./icons/Confluence";
import Firebase from "./icons/Firebase";
import Gitlab from "./icons/Gitlab";
import Jira from "./icons/Jira";

const Services = [
  {
    id: 1,
    name: 'Github',
    icon: <AiFillGithub size={36} fill='#9C98B0' />,
  },
  {
    id: 2,
    name: 'Gitlab',
    icon: <Gitlab size={54} />,
  },
  {
    id: 3,
    name: 'Bitbucket',
    icon: <Bitbucket size={36} />,
  },
  {
    id: 4,
    name: 'Firebase',
    icon: <Firebase size={36} />,
  },
  {
    id: 7,
    name: 'Vercel',
    icon: <TbBrandVercel size={36} color='#9C98B0' />,
  },
  {
    id: 8,
    name: 'Netlify',
    icon: <SiNetlify size={32} stroke='#25C7B7' />,
  },
  {
    id: 9,
    name: 'Heroku',
    icon: <SiHeroku size={32} fill='#6762A6' />,
  },

  {
    id: 12,
    name: 'Jira',
    icon: <Jira size={36} />,
  },
  {
    id: 13,
    name: 'Confluence',
    icon: <Confluence size={32} />,
  },

];

export default Services;