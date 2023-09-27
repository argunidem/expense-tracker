"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import { scrollToSection } from "@/utils/scroll";
import { cn } from "@/lib/utils";

interface NavLinkProps extends LinkProps, React.HTMLAttributes<HTMLAnchorElement> {
   active?: boolean;
   target?: string;
   href: string;
   children?: React.ReactNode;
}

const ActiveClasses = "font-medium text-base text-blue-500 dark:text-white";
const InactiveClasses =
   "font-medium text-base text-neutral-600/95 dark:text-neutral-300/70 dark:hover:text-neutral-600 hover:text-gray-400";

const NavLink = ({ children, active, target, href, ...props }: NavLinkProps) => {
   const router = useRouter();
   const pathname = usePathname();

   const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname !== "/") {
         router.push(href);
      }
      scrollToSection(e);
   };

   return (
      <Link
         href={href}
         onClick={handleClick}
         target={target || "_self"}
         className={cn(
            props.className ? props.className : active ? ActiveClasses : InactiveClasses
         )}
      >
         {children}
      </Link>
   );
};

export default NavLink;
