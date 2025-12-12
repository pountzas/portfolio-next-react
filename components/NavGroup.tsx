import { FaEnvelope, FaHome } from 'react-icons/fa'
import { GiSkills } from 'react-icons/gi'
import { RiGitRepositoryLine } from 'react-icons/ri'
import { useRouter } from 'next/router'

export interface NavItem {
  label: string
  path: string
  icon: React.ReactNode
  isActive: boolean
  onClick: () => void
}

const navItems = [
  {
    label: 'Home',
    path: '/',
    icon: <FaHome />,
  },
  {
    label: 'Projects',
    path: '/Projects',
    icon: <RiGitRepositoryLine />,
  },
  {
    label: 'Skills',
    path: '/Skills',
    icon: <GiSkills />,
  },
  {
    label: 'Contact',
    path: '/Contact',
    icon: <FaEnvelope />,
  },
]

export const useNavGroup = (): NavItem[] => {
  const router = useRouter()

  return navItems.map(item => ({
    ...item,
    isActive: router.pathname === item.path,
    onClick: () => router.push(item.path),
  }))
}

export default navItems