"use client";

import Link, { LinkProps } from "next/link";
import clsx from "clsx";
import { scrollToSection } from "@/utils/scroll";

interface NavLinkProps extends LinkProps, React.HTMLAttributes<HTMLAnchorElement> {
   active?: boolean;
   target?: string;
   href: string;
   children?: React.ReactNode;
}

const ActiveClasses = "text-blue-500 dark:text-white";
const InactiveClasses =
   "text-neutral-600/95 dark:text-neutral-300/70 dark:hover:text-neutral-600 hover:text-gray-400";

const NavLink = ({ children, active, target, href, ...props }: NavLinkProps) => {
   return (
      <Link
         href={href}
         onClick={(e) => scrollToSection(e)}
         target={target || "_self"}
         {...props}
         className={clsx(
            "font-medium text-base",
            active ? ActiveClasses : InactiveClasses,
            props.className && props.className
         )}
      >
         {children}
      </Link>
   );
};

export default NavLink;
