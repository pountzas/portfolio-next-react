import Link from "next/link";
import { motion } from "framer-motion";
import { flipFromTop } from "./animations/pageAnimations";
import NavItem from "./NavItem";
import { useNavGroup } from "./NavGroup";
import {
  BRAND_HREF,
  BRAND_NAME,
  PRIMARY_NAV_ARIA_LABEL,
} from "./navA11y.mjs";

export default function Header() {
  const navItems = useNavGroup();

  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-borderSecondary bg-primary py-3 shadow-sm"
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      variants={flipFromTop}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="mx-auto flex justify-between md:max-w-4xl xl:max-w-6xl">
        <Link
          href={BRAND_HREF}
          aria-label={BRAND_NAME}
          className="px-3 font-semibold text-textPrimary md:px-0"
        >
          N<span className="hidden sm:inline-block">ikos</span> P
          <span className="hidden sm:inline-block">ountzas</span>
        </Link>

        <nav
          aria-label={PRIMARY_NAV_ARIA_LABEL}
          className="flex space-x-8 px-3 text-textTertiary md:px-0"
        >
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              label={item.label}
              path={item.path}
              mobileIcon={item.icon}
              isActive={item.isActive}
            />
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
