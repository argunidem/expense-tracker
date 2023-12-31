import Link from "next/link";
import { usePathname } from "next/navigation";

import NavLink from "./nav-link";
import ThemeSwitcher from "../../theme/theme-switcher";
import useActiveSection from "@/hooks/use-active-section";
import { authItems, items } from "@/constants/nav-items";
import { cn } from "@/utils/cn";

const NavMenu = ({ isMenuOpen }: { isMenuOpen: boolean }) => {
   const pathname = usePathname();
   const active = useActiveSection();

   return (
      <div
         className={cn(
            "overflow-hidden max-h-0 transition-all duration-700 basis-full grow",
            isMenuOpen ? "max-h-96" : "md:max-h-max"
         )}
      >
         <div className='flex flex-col animate-left gap-4 mt-5 md:flex-row md:items-center md:justify-end md:mt-0 md:pl-5'>
            <ThemeSwitcher />
            {(pathname === "/" ? items : authItems).map(({ href, text }, index) => (
               <NavLink
                  href={href}
                  active={active === text.toLowerCase()}
                  key={index}
               >
                  {text}
               </NavLink>
            ))}
            {pathname === "/" && (
               <Link
                  href='/login'
                  className='text-base font-medium text-neutral-600/95 rounded-md dark:text-neutral-300/70 dark:border-neutral-700/90 hover:border-neutral-200 dark:hover:text-neutral-600 hover:text-gray-400 md:border md:px-4 md:py-1 md:text-sm md:hover:bg-neutral-100 md:hover:text-neutral-600 md:dark:hover:text-neutral-300 md:dark:hover:bg-neutral-800/70'
               >
                  Login
               </Link>
            )}
         </div>
      </div>
   );
};

export default NavMenu;
