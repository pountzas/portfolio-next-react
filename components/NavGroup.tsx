import { FaEnvelope, FaHome, FaUser } from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import { RiGitRepositoryLine } from "react-icons/ri";
import { useRouter } from "next/router";
import { isNavItemActive } from "./navA11y.mjs";

export interface NavItemData {
  label: string;
  path: string;
  icon: React.ReactNode;
  isActive: boolean;
}

const navItems = [
  {
    label: 'Home',
    path: '/',
    icon: <FaHome />,
  },
  {
    label: 'About',
    path: '/About',
    icon: <FaUser />,
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
];
export const useNavGroup = (): NavItemData[] => {
  const router = useRouter();

  return navItems.map((item) => ({
    ...item,
    isActive: isNavItemActive(router.pathname, item.path),
  }));
};

export default navItems;
