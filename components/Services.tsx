import { AiFillGithub } from "react-icons/ai";
import { SiHeroku, SiNetlify } from "react-icons/si";
import { TbBrandVercel } from "react-icons/tb";

import Bitbucket from "./icons/Bitbucket";
import Confluence from "./icons/Confluence";
import Firebase from "./icons/Firebase";
import Gitlab from "./icons/Gitlab";
import Jira from "./icons/Jira";
import MongoDB from "./icons/MongoDB";

interface Service {
  id: string | number;
  name: string;
  icon: React.ReactElement;
  description: string;
  proficiency: number;
}

const Services: Service[] = [
  {
    id: 1,
    name: 'Github',
    icon: <AiFillGithub size={36} fill='#9C98B0' />,
    description: 'Leading platform for version control and collaboration, hosting millions of open-source projects and private repositories.',
    proficiency: 90,
  },
  {
    id: 2,
    name: 'Gitlab',
    icon: <Gitlab size={54} />,
    description: 'Complete DevOps platform providing Git repository management, CI/CD pipelines, and project management tools.',
    proficiency: 75,
  },
  {
    id: 3,
    name: 'Bitbucket',
    icon: <Bitbucket size={36} />,
    description: 'Git-based source code repository hosting service owned by Atlassian, integrated with Jira and other Atlassian tools.',
    proficiency: 70,
  },
  {
    id: 4,
    name: 'Firebase',
    icon: <Firebase size={36} />,
    description: 'Google\'s mobile and web application development platform with authentication, database, and hosting services.',
    proficiency: 80,
  },
  {
    id: 5,
    name: 'MongoDB',
    icon: <MongoDB size={42} fill='#9C98B0' />,
    description: 'NoSQL document database designed for ease of development and scaling, storing data in flexible JSON-like documents.',
    proficiency: 75,
  },
  {
    id: 6,
    name: 'Vercel',
    icon: <TbBrandVercel size={36} color='#9C98B0' />,
    description: 'Cloud platform for static sites and serverless functions, optimized for frontend frameworks like Next.js.',
    proficiency: 85,
  },
  {
    id: 7,
    name: 'Netlify',
    icon: <SiNetlify size={32} stroke='#25C7B7' />,
    description: 'Web hosting and serverless backend services provider with continuous deployment from Git repositories.',
    proficiency: 80,
  },
  {
    id: 8,
    name: 'Heroku',
    icon: <SiHeroku size={32} fill='#6762A6' />,
    description: 'Cloud platform as a service supporting multiple programming languages for deploying and scaling applications.',
    proficiency: 75,
  },

  {
    id: 9,
    name: 'Jira',
    icon: <Jira size={36} />,
    description: 'Powerful project management and issue tracking tool developed by Atlassian for agile development teams.',
    proficiency: 70,
  },
  {
    id: 10,
    name: 'Confluence',
    icon: <Confluence size={32} />,
    description: 'Collaboration platform for creating, sharing, and collaborating on project documentation and knowledge bases.',
    proficiency: 65,
  },

];

export default Services;
