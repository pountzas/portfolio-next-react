import Css3 from './icons/css3';
import Ruby from './icons/ruby';
import Javascript from './icons/javascript';
import Html from './icons/Html';
import TypeScript from './icons/TypeScript';
import { Language } from '../types';

const Languages: Language[] = [
  {
    id: 1,
    name: 'HTML5',
    icon: <Html size={32} />,
    description: 'HTML (HyperText Markup Language) is the standard markup language for creating web pages and web applications. Maintained by WHATWG as a living standard.',
    proficiency: 95,
    officialSite: 'https://html.spec.whatwg.org/',
  },
  {
    id: 2,
    name: 'CSS3',
    icon: <Css3 size={32} />,
    description: 'CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in HTML. Maintained by W3C.',
    proficiency: 90,
    officialSite: 'https://www.w3.org/Style/CSS/',
  },
  {
    id: 3,
    name: 'Ruby',
    icon: <Ruby fill='#E0115F' />,
    description: 'Ruby is an interpreted, high-level, general-purpose programming language which supports multiple programming paradigms. Known for its elegant syntax.',
    proficiency: 75,
    officialSite: 'https://www.ruby-lang.org/',
  },
  {
    id: 4,
    name: 'JavaScript',
    icon: <Javascript size={36} fill='#F0DB4F' fill2='#323330' />,
    description: 'JavaScript is a programming language that conforms to the ECMAScript specification. Enables interactive web pages and is an essential part of web applications.',
    proficiency: 85,
    officialSite: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  {
    id: 5,
    name: 'TypeScript',
    icon: <TypeScript size={36} />,
    description: 'TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. Developed and maintained by Microsoft.',
    proficiency: 80,
    officialSite: 'https://www.typescriptlang.org/',
  }
];

export default Languages;

