import { TbBrandReactNative, TbBrandVercel } from "react-icons/tb";
import { DiBootstrap, DiPostgresql } from "react-icons/di";
import { SiCinema4D, SiElectron, SiGraphql, SiHeroku, SiNetlify, SiRust, SiTauri } from "react-icons/si";
import { GrDocker } from "react-icons/gr";
import { AiFillGithub } from "react-icons/ai";

import Css3 from "../components/icons/css3";
import Ruby from "../components/icons/ruby";
import Javascript from "../components/icons/javascript";
import Html from "../components/icons/Html";
import TypeScript from "../components/icons/TypeScript";
import ReactIcon from "../components/icons/ReactIcon";
import Redux from "../components/icons/redux";
import MotionFramer from "../components/icons/MotionFramer";
import NodeJs from "../components/icons/NodeJs";
import NextJs from "../components/icons/nextJs";
import Rails from "../components/icons/rails";
import Tailwind from "../components/icons/tailwind";
import Eslint from "../components/icons/eslint";
import Corel from "../components/icons/corel";
import VScode from "../components/icons/VScode";
import Git from "../components/icons/Git";
import Photoshop from "../components/icons/Photoshop";
import Illustrator from "../components/icons/Illustrator";
import Figma from "../components/icons/Figma";
import Bitbucket from "../components/icons/Bitbucket";
import Confluence from "../components/icons/Confluence";
import Firebase from "../components/icons/Firebase";
import Supabase from "../components/icons/Supabase";
import Gitlab from "../components/icons/Gitlab";
import Jira from "../components/icons/Jira";
import MongoDB from "../components/icons/MongoDB";

import type { BaseSkillItem } from "../types";

export type SkillEntryAnimation = "left" | "top" | "right" | "bottom";

export interface SkillSectionData {
  id: string;
  title: string;
  skills: BaseSkillItem[];
  gridCols: string;
  entryAnimation: SkillEntryAnimation;
}

const languages: BaseSkillItem[] = [
  {
    id: "javascript",
    name: "JavaScript",
    icon: <Javascript size={36} fill="#F0DB4F" fill2="#323330" />,
    description:
      "JavaScript is a programming language that conforms to the ECMAScript specification. Enables interactive web pages and is an essential part of web applications.",
    proficiency: 85,
    officialSite: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: <TypeScript size={36} />,
    description:
      "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. Developed and maintained by Microsoft.",
    proficiency: 80,
    officialSite: "https://www.typescriptlang.org/"
  },
  {
    id: "ruby",
    name: "Ruby",
    icon: <Ruby fill="#E0115F" />,
    description:
      "Ruby is an interpreted, high-level, general-purpose programming language which supports multiple programming paradigms. Known for its elegant syntax.",
    proficiency: 75,
    officialSite: "https://www.ruby-lang.org/"
  },
  {
    id: "rust",
    name: "Rust",
    icon: <SiRust size={36} color="#DEA584" />,
    description:
      "Rust is a systems programming language focused on safety, concurrency, and performance. It powers native apps, CLIs, and WebAssembly without a garbage collector.",
    proficiency: 70,
    officialSite: "https://www.rust-lang.org/"
  },
  {
    id: "html5",
    name: "HTML5",
    icon: <Html size={32} />,
    description:
      "HTML (HyperText Markup Language) is the standard markup language for creating web pages and web applications. Maintained by WHATWG as a living standard.",
    proficiency: 95,
    officialSite: "https://html.spec.whatwg.org/"
  },
  {
    id: "css3",
    name: "CSS3",
    icon: <Css3 size={32} />,
    description:
      "CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in HTML. Maintained by W3C.",
    proficiency: 90,
    officialSite: "https://www.w3.org/Style/CSS/"
  }
];

const web: BaseSkillItem[] = [
  {
    id: "react",
    name: "React",
    icon: <ReactIcon fill="#61DAFB" size={32} />,
    description:
      "React is a free and open-source front-end JavaScript library for building user interfaces based on components. Developed and maintained by Meta.",
    proficiency: 90,
    officialSite: "https://react.dev/"
  },
  {
    id: "nextjs",
    name: "Next.js",
    icon: <NextJs size={34} fill="#9C98B0" />,
    description:
      "Next.js is a React framework that enables functionality such as server-side rendering and generating static websites for React-based web applications.",
    proficiency: 85,
    officialSite: "https://nextjs.org/"
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    icon: <Tailwind size={38} fill="#9C98B0" />,
    description:
      "A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup. Rapidly build modern websites.",
    proficiency: 90,
    officialSite: "https://tailwindcss.com/"
  },
  {
    id: "bootstrap",
    name: "Bootstrap",
    icon: <DiBootstrap size={36} fill="#7710F1" />,
    description:
      "Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. Includes HTML, CSS and JavaScript.",
    proficiency: 80,
    officialSite: "https://getbootstrap.com/"
  },
  {
    id: "framer-motion",
    name: "Framer Motion",
    icon: <MotionFramer size={32} />,
    description:
      "Framer Motion is a production-ready motion library for React. Use it to create animations and interactions that feel smooth and natural.",
    proficiency: 85,
    officialSite: "https://www.framer.com/motion/"
  },
  {
    id: "redux",
    name: "Redux",
    icon: <Redux fill="#764ABC" size={32} />,
    description:
      "Redux is a predictable state container for JavaScript applications. It helps you write applications that behave consistently, run in different environments.",
    proficiency: 80,
    officialSite: "https://redux.js.org/"
  }
];

const nativeApps: BaseSkillItem[] = [
  {
    id: "react-native",
    name: "React Native",
    icon: <TbBrandReactNative color="#61DAFB" size={32} />,
    description:
      "React Native is an open-source UI software framework created by Meta Platforms, Inc. It is used to develop applications for Android, iOS, Web and UWP.",
    proficiency: 70,
    officialSite: "https://reactnative.dev/"
  },
  {
    id: "tauri",
    name: "Tauri",
    icon: <SiTauri size={36} color="#FFC131" />,
    description:
      "Tauri is a toolkit for building small, fast desktop apps with a web frontend and a Rust backend. It ships native Windows, macOS, and Linux binaries.",
    proficiency: 65,
    officialSite: "https://tauri.app/"
  },
  {
    id: "electron",
    name: "Electron",
    icon: <SiElectron size={36} color="#9FEAF9" />,
    description:
      "Electron is a framework for building cross-platform desktop apps with HTML, CSS, and JavaScript. It combines Chromium and Node.js into a single runtime.",
    proficiency: 70,
    officialSite: "https://www.electronjs.org/"
  }
];

const backendAndData: BaseSkillItem[] = [
  {
    id: "nodejs",
    name: "Node.js",
    icon: <NodeJs fill="#83CD29" size={36} />,
    description:
      "Node.js is a cross-platform, open-source server environment that can run JavaScript code outside of a web browser. Built on Chrome's V8 JavaScript engine.",
    proficiency: 75,
    officialSite: "https://nodejs.org/"
  },
  {
    id: "rails",
    name: "Ruby on Rails",
    icon: <Rails size={44} fill="#CC0000" />,
    description:
      "Ruby on Rails is a server-side web application framework written in Ruby. It follows the model–view–controller (MVC) architectural pattern.",
    proficiency: 70,
    officialSite: "https://rubyonrails.org/"
  },
  {
    id: "graphql",
    name: "GraphQL",
    icon: <SiGraphql size={36} fill="#E10098" />,
    description:
      "GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. Developed by Facebook (Meta).",
    proficiency: 75,
    officialSite: "https://graphql.org/"
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    icon: <DiPostgresql size={44} fill="#2F6792" />,
    description:
      "PostgreSQL is a free and open-source relational database management system emphasizing extensibility and SQL compliance.",
    proficiency: 70,
    officialSite: "https://www.postgresql.org/"
  },
  {
    id: "mongodb",
    name: "MongoDB",
    icon: <MongoDB size={42} fill="#9C98B0" />,
    description:
      "MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents.",
    proficiency: 75,
    officialSite: "https://www.mongodb.com/"
  },
  {
    id: "firebase",
    name: "Firebase",
    icon: <Firebase size={36} />,
    description:
      "Firebase is a platform developed by Google for creating mobile and web applications. Provides authentication, database, hosting, and other backend services.",
    proficiency: 80,
    officialSite: "https://firebase.google.com/"
  },
  {
    id: "supabase",
    name: "Supabase",
    icon: <Supabase size={36} />,
    description:
      "Supabase is an open-source backend platform built on PostgreSQL. It provides authentication, realtime APIs, storage, and edge functions for web and mobile apps.",
    proficiency: 75,
    officialSite: "https://supabase.com/"
  }
];

const toolingAndPlatforms: BaseSkillItem[] = [
  {
    id: "vscode",
    name: "Visual Studio Code",
    icon: <VScode size={40} />,
    description:
      "Visual Studio Code is a free source-code editor made by Microsoft for Windows, Linux and macOS. Features include support for debugging, syntax highlighting, and version control.",
    proficiency: 95,
    officialSite: "https://code.visualstudio.com/"
  },
  {
    id: "git",
    name: "Git",
    icon: <Git size={44} />,
    description:
      "Git is a distributed version-control system for tracking changes in source code during software development. Designed by Linus Torvalds.",
    proficiency: 85,
    officialSite: "https://git-scm.com/"
  },
  {
    id: "docker",
    name: "Docker",
    icon: <GrDocker size={40} fill="#2497ED" />,
    description:
      "Docker is a set of platform as a service products that deliver software in packages called containers. Enables consistent deployment across environments.",
    proficiency: 75,
    officialSite: "https://www.docker.com/"
  },
  {
    id: "eslint",
    name: "ESLint",
    icon: <Eslint size={36} fill="#4A2EC4" fill2="#8181F2" />,
    description:
      "ESLint is a static code analysis tool for identifying problematic patterns found in JavaScript code. Helps maintain code quality and consistency.",
    proficiency: 85,
    officialSite: "https://eslint.org/"
  },
  {
    id: "github",
    name: "GitHub",
    icon: <AiFillGithub size={36} fill="#9C98B0" />,
    description:
      "GitHub is a developer platform that allows developers to create, store, manage and share their code. Acquired by Microsoft in 2018.",
    proficiency: 90,
    officialSite: "https://github.com/"
  },
  {
    id: "gitlab",
    name: "GitLab",
    icon: <Gitlab size={54} />,
    description:
      "GitLab is a web-based DevOps lifecycle tool that provides a Git repository manager providing wiki, issue-tracking and continuous integration and deployment pipeline features.",
    proficiency: 75,
    officialSite: "https://about.gitlab.com/"
  },
  {
    id: "bitbucket",
    name: "Bitbucket",
    icon: <Bitbucket size={36} />,
    description:
      "Bitbucket is a Git-based source code repository hosting service owned by Atlassian. Offers both commercial plans and free accounts with unlimited private repositories.",
    proficiency: 70,
    officialSite: "https://bitbucket.org/"
  },
  {
    id: "vercel",
    name: "Vercel",
    icon: <TbBrandVercel size={36} color="#9C98B0" />,
    description:
      "Vercel is a platform for developers to deploy, scale, and collaborate on web applications. Specializes in static sites and frontend frameworks.",
    proficiency: 85,
    officialSite: "https://vercel.com/"
  },
  {
    id: "netlify",
    name: "Netlify",
    icon: <SiNetlify size={32} stroke="#25C7B7" />,
    description:
      "Netlify is a web development company that offers hosting and serverless backend services for web applications and static websites.",
    proficiency: 80,
    officialSite: "https://www.netlify.com/"
  },
  {
    id: "heroku",
    name: "Heroku",
    icon: <SiHeroku size={32} fill="#6762A6" />,
    description:
      "Heroku is a cloud platform as a service supporting several programming languages. One of the first cloud platforms, acquired by Salesforce.",
    proficiency: 75,
      officialSite: "https://www.heroku.com/"
  },
  {
    id: "jira",
    name: "Jira",
    icon: <Jira size={36} />,
    description:
      "Jira is a proprietary issue tracking product developed by Atlassian that allows bug tracking and agile project management.",
    proficiency: 70,
    officialSite: "https://www.atlassian.com/software/jira"
  },
  {
    id: "confluence",
    name: "Confluence",
    icon: <Confluence size={32} />,
    description:
      "Confluence is a collaboration platform developed by Atlassian. Used to create, share, and collaborate on project documentation and knowledge bases.",
    proficiency: 65,
    officialSite: "https://www.atlassian.com/software/confluence"
  }
];

const design: BaseSkillItem[] = [
  {
    id: "figma",
    name: "Figma",
    icon: <Figma size={40} />,
    description:
      "Figma is a vector graphics editor and prototyping tool which is primarily web-based, with additional offline features enabled by desktop applications.",
    proficiency: 80,
    officialSite: "https://www.figma.com/"
  },
  {
    id: "photoshop",
    name: "Adobe Photoshop",
    icon: <Photoshop size={40} />,
    description:
      "Adobe Photoshop is a raster graphics editor developed and published by Adobe Inc. Used for photo editing, digital art, and graphic design.",
    proficiency: 75,
    officialSite: "https://www.adobe.com/products/photoshop.html"
  },
  {
    id: "illustrator",
    name: "Adobe Illustrator",
    icon: <Illustrator size={40} />,
    description:
      "Adobe Illustrator is a vector graphics editor and design program developed and marketed by Adobe Inc. Used for creating logos and illustrations.",
    proficiency: 70,
    officialSite: "https://www.adobe.com/products/illustrator.html"
  },
  {
    id: "cinema4d",
    name: "Cinema 4D",
    icon: <SiCinema4D size={32} fill="#9C98B0" />,
    description:
      "Cinema 4D is a professional 3D modeling, animation, simulation and rendering software solution developed by Maxon Computer GmbH.",
    proficiency: 60,
    officialSite: "https://www.maxon.net/en/cinema-4d"
  },
  {
    id: "coreldraw",
    name: "CorelDRAW",
    icon: <Corel size={80} />,
    description:
      "CorelDRAW is a vector graphics editor developed and marketed by Corel Corporation. Used for graphic design and page layout.",
    proficiency: 65,
    officialSite: "https://www.coreldraw.com/"
  }
];

export const SKILL_SECTIONS: SkillSectionData[] = [
  {
    id: "languages",
    title: "Languages",
    skills: languages,
    gridCols: "grid-cols-2 md:grid-cols-3",
    entryAnimation: "left"
  },
  {
    id: "web",
    title: "Web",
    skills: web,
    gridCols: "grid-cols-2 md:grid-cols-3",
    entryAnimation: "top"
  },
  {
    id: "native-apps",
    title: "Native Apps",
    skills: nativeApps,
    gridCols: "grid-cols-2 md:grid-cols-3",
    entryAnimation: "right"
  },
  {
    id: "backend-and-data",
    title: "Backend & Data",
    skills: backendAndData,
    gridCols: "grid-cols-2 md:grid-cols-3",
    entryAnimation: "left"
  },
  {
    id: "tooling-and-platforms",
    title: "Tooling & Platforms",
    skills: toolingAndPlatforms,
    gridCols: "grid-cols-2 md:grid-cols-3",
    entryAnimation: "bottom"
  },
  {
    id: "design",
    title: "Design",
    skills: design,
    gridCols: "grid-cols-2 md:grid-cols-3",
    entryAnimation: "right"
  }
];
