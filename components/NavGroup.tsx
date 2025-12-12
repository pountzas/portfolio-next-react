import { FaEnvelope, FaHome } from 'react-icons/fa'
import { GiSkills } from 'react-icons/gi'
import { RiGitRepositoryLine } from 'react-icons/ri'
import { useRouter } from 'next/router'

const router = useRouter();


const NavGroup = [
  {
    label: 'Home',
    path: '/',
    icon: <FaHome />,
    isActive: router.pathname === '/',
    onClick: () => router.push('/'),
  },
  {
    label: 'Projects',
    path: '/Projects',
    icon: <RiGitRepositoryLine />,
    isActive: router.pathname === '/Projects',
    onClick: () => router.push('/Projects'),
  },
  
  {
    label: 'Skills',
    path: '/Skills',
    icon: <GiSkills />,
    isActive: router.pathname === '/Skills',
    onClick: () => router.push('/Skills'),
  },
  {
    label: 'Contact',
    path: '/Contact',
    icon: <FaEnvelope />,
    isActive: router.pathname === '/Contact',
    onClick: () => router.push('/Contact'),
  },
]


export default NavGroup