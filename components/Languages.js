import Css3 from './icons/css3';
import Ruby from './icons/ruby';
import Javascript from './icons/javascript';
import Html from './icons/Html';

const Languages = [
  {
    id: 1,
    name: 'HTML5',
    icon: <Html size={32} />,
  },
  {
    id: 2,
    name: 'CSS3',
    icon: <Css3 size={32} />,
  },
  {
    id: 3,
    name: 'Ruby',
    icon: <Ruby fill='#E0115F' />,
  },
  {
    id: 4,
    name: 'JavaScript',
    icon: <Javascript size={36} fill='#F0DB4F' fill2='#323330' />,
  },
];

export default Languages;
