import Link from "next/link";
import SocialLinks from "./SocialLinks";
import { FOOTER_SITE_LINKS } from "./socialLinksA11y.mjs";

export default function Footer() {
  return (
    <footer className="w-full border-t border-borderSecondary bg-primary">
      <div className="mx-auto flex flex-col gap-4 px-4 py-4 text-textTertiary md:max-w-4xl md:flex-row md:items-center md:justify-between xl:max-w-6xl">
        <nav aria-label="Footer" className="flex flex-wrap gap-x-4 gap-y-2">
          {FOOTER_SITE_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center">
              {item.label}
            </Link>
          ))}
        </nav>
        <SocialLinks />
        <div className="flex flex-col gap-1 text-sm md:items-end">
          <div className="hidden md:block">
            Designed and Developed by Pountzas Nikos
          </div>
          <div>
            Copyright © 2022 - {new Date().getFullYear()} NP
          </div>
        </div>
      </div>
    </footer>
  );
}
