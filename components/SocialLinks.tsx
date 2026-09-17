import Link from "next/link";
import Socials from "./Socials";
import {
  SOCIAL_LINK_CLASS_NAME,
  socialProfileAriaLabel,
} from "./socialLinksA11y.mjs";

type SocialLinksProps = {
  className?: string;
};

export default function SocialLinks({ className = "" }: SocialLinksProps) {
  const listClassName = ["flex items-center justify-center space-x-2", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={listClassName}>
      {Socials.map((social) => (
        <Link
          key={social.id}
          href={social.path}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={socialProfileAriaLabel(social.name)}
          className={SOCIAL_LINK_CLASS_NAME}>
          <span aria-hidden="true" className="text-2xl md:text-3xl">
            {social.icon}
          </span>
        </Link>
      ))}
    </div>
  );
}
