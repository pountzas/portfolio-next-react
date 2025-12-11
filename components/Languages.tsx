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
    description: 'The backbone of web development, providing semantic structure and accessibility to modern websites.',
    proficiency: 95,
  },
  {
    id: 2,
    name: 'CSS3',
    icon: <Css3 size={32} />,
    description: 'Advanced styling language with animations, flexbox, grid, and responsive design capabilities.',
    proficiency: 90,
  },
  {
    id: 3,
    name: 'Ruby',
    icon: <Ruby fill='#E0115F' />,
    description: 'Elegant object-oriented programming language known for its simplicity and developer happiness.',
    proficiency: 75,
  },
  {
    id: 4,
    name: 'JavaScript',
    icon: <Javascript size={36} fill='#F0DB4F' fill2='#323330' />,
    description: 'Versatile programming language powering interactive web experiences and server-side applications.',
    proficiency: 85,
  },
  {
    id: 5,
    name: 'TypeScript',
    icon: <TypeScript size={36} />,
    description: 'Typed superset of JavaScript providing enhanced developer experience and runtime safety.',
    proficiency: 80,
  }
];

export default Languages;

