import { AiFillGithub } from "react-icons/ai";
import { SiHeroku, SiNetlify } from "react-icons/si";
import { TbBrandVercel } from "react-icons/tb";

import Bitbucket from "./icons/Bitbucket";
import Confluence from "./icons/Confluence";
import Firebase from "./icons/Firebase";
import Gitlab from "./icons/Gitlab";
import Jira from "./icons/Jira";
import MongoDB from "./icons/MongoDB";
import { Service } from '../types';

const Services: Service[] = [
  {
    id: 1,
    name: 'GitHub',
    icon: <AiFillGithub size={36} fill='#9C98B0' />,
    description: 'GitHub is a developer platform that allows developers to create, store, manage and share their code. Acquired by Microsoft in 2018.',
    proficiency: 90,
    officialSite: 'https://github.com/',
  },
  {
    id: 2,
    name: 'GitLab',
    icon: <Gitlab size={54} />,
    description: 'GitLab is a web-based DevOps lifecycle tool that provides a Git repository manager providing wiki, issue-tracking and continuous integration and deployment pipeline features.',
    proficiency: 75,
    officialSite: 'https://about.gitlab.com/',
  },
  {
    id: 3,
    name: 'Bitbucket',
    icon: <Bitbucket size={36} />,
    description: 'Bitbucket is a Git-based source code repository hosting service owned by Atlassian. Offers both commercial plans and free accounts with unlimited private repositories.',
    proficiency: 70,
    officialSite: 'https://bitbucket.org/',
  },
  {
    id: 4,
    name: 'Firebase',
    icon: <Firebase size={36} />,
    description: 'Firebase is a platform developed by Google for creating mobile and web applications. Provides authentication, database, hosting, and other backend services.',
    proficiency: 80,
    officialSite: 'https://firebase.google.com/',
  },
  {
    id: 5,
    name: 'MongoDB',
    icon: <MongoDB size={42} fill='#9C98B0' />,
    description: 'MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents.',
    proficiency: 75,
    officialSite: 'https://www.mongodb.com/',
  },
  {
    id: 6,
    name: 'Vercel',
    icon: <TbBrandVercel size={36} color='#9C98B0' />,
    description: 'Vercel is a platform for developers to deploy, scale, and collaborate on web applications. Specializes in static sites and frontend frameworks.',
    proficiency: 85,
    officialSite: 'https://vercel.com/',
  },
  {
    id: 7,
    name: 'Netlify',
    icon: <SiNetlify size={32} stroke='#25C7B7' />,
    description: 'Netlify is a web development company that offers hosting and serverless backend services for web applications and static websites.',
    proficiency: 80,
    officialSite: 'https://www.netlify.com/',
  },
  {
    id: 8,
    name: 'Heroku',
    icon: <SiHeroku size={32} fill='#6762A6' />,
    description: 'Heroku is a cloud platform as a service supporting several programming languages. One of the first cloud platforms, acquired by Salesforce.',
    proficiency: 75,
    officialSite: 'https://www.heroku.com/',
  },

  {
    id: 9,
    name: 'Jira',
    icon: <Jira size={36} />,
    description: 'Jira is a proprietary issue tracking product developed by Atlassian that allows bug tracking and agile project management.',
    proficiency: 70,
    officialSite: 'https://www.atlassian.com/software/jira',
  },
  {
    id: 10,
    name: 'Confluence',
    icon: <Confluence size={32} />,
    description: 'Confluence is a collaboration platform developed by Atlassian. Used to create, share, and collaborate on project documentation and knowledge bases.',
    proficiency: 65,
    officialSite: 'https://www.atlassian.com/software/confluence',
  },

];

export default Services;
