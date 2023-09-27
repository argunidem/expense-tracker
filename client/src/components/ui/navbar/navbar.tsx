"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import ThemeSwitcher from "../../theme-switcher";
import { Button } from "../button";
import NavLink from "./nav-link";
import useActiveSection from "@/hooks/use-active-section";
import { authItems, items } from "@/constants/nav-items";
import { cn } from "@/lib/utils";

const Navbar = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const active = useActiveSection();
   const pathname = usePathname();

   return (
      <header className='fixed group w-full z-50 bg-white border-b text-sm py-4 transition-all duration-300 dark:bg-zinc-900 dark:border-b-neutral-800 md:hover:py-6 sm:justify-start'>
         <nav className='max-w-[1600px] w-full mx-auto px-4 md:flex md:items-center md:justify-between md:py-[3px] lg:px-8 xl:px-16'>
            <div className='flex items-center justify-between'>
               <NavLink
                  href={pathname === "/" ? "#home" : "/"}
                  className='flex-none animate-right font-black text-2xl text-neutral-800/90 dark:text-neutral-200'
               >
                  XpenseWise
               </NavLink>
               <Button
                  className='relative md:hidden'
                  variant={"primary"}
                  border={"default"}
                  shadow={"default"}
                  size={"auto"}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
               >
                  <Menu
                     className={cn(
                        "w-5 h-5 transition-all duration-500 rotate-0",
                        isMenuOpen && "rotate-45 scale-50 opacity-0"
                     )}
                  />
                  <X
                     className={cn(
                        "absolute w-5 h-5 transition-all duration-300 opacity-0 rotate-0",
                        isMenuOpen && "rotate-180 opacity-100"
                     )}
                  />
               </Button>
            </div>
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
         </nav>
      </header>
   );
};

export default Navbar;
