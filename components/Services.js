import { AiFillGithub } from "react-icons/ai";
import { FaBitbucket, FaGitlab } from "react-icons/fa";
import { SiConfluence, SiFirebase, SiHeroku, SiJira, SiNetlify } from "react-icons/si";

const Services = [
  {
    id: 1,
    name: 'Github',
    icon: <AiFillGithub size={36} fill='#9C98B0' />,
  },
  {
    id: 2,
    name: 'Gitlab',
    icon: <FaGitlab size={32} fill='#9C98B0' />,
  },
  {
    id: 3,
    name: 'Bitbucket',
    icon: <FaBitbucket size={28} fill='#9C98B0' />,
  },
  {
    id: 7,
    name: 'Firebase',
    icon: <SiFirebase size={36} fill='#9C98B0' />,
  },
  {
    id: 8,
    name: 'Netlify',
    icon: <SiNetlify size={36} fill='#9C98B0' />,
  },
  {
    id: 9,
    name: 'Heroku',
    icon: <SiHeroku size={32} fill='#9C98B0' />,
  },

  {
    id: 12,
    name: 'Jira',
    icon: <SiJira size={28} fill='#9C98B0' />,
  },
  {
    id: 13,
    name: 'Confluence',
    icon: <SiConfluence size={28} fill='#9C98B0' />,
  },

];

export default Services;