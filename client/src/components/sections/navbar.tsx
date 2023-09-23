"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Menu, X } from "lucide-react";

import ThemeSwitcher from "../theme-switcher";
import { Button } from "../ui/button";
import NavLink from "../ui/link";
import useActiveSection from "@/hooks/useActiveSection";
import { scrollToSection } from "@/utils/scroll";

const Navbar = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const active = useActiveSection();

   return (
      <header className='fixed group w-full z-50 bg-white border-b text-sm py-4 transition-all duration-300 dark:bg-zinc-900 dark:border-b-neutral-800 md:hover:py-6 sm:justify-start'>
         <nav className='max-w-[1600px] w-full mx-auto px-4 md:flex md:items-center md:justify-between md:py-[3px] lg:px-8 xl:px-16'>
            <div className='flex items-center justify-between'>
               <Link
                  href='#home'
                  onClick={(e) => scrollToSection(e)}
                  className='flex-none animate-right font-black text-2xl text-neutral-800/90 dark:text-neutral-100'
               >
                  XpenseWise
               </Link>
               <Button
                  className='relative md:hidden'
                  variant={"primary"}
                  border={"default"}
                  shadow={"default"}
                  size={"auto"}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
               >
                  <Menu
                     className={clsx(
                        "w-5 h-5 transition-all duration-500 rotate-0",
                        isMenuOpen && "rotate-45 scale-50 opacity-0"
                     )}
                  />
                  <X
                     className={clsx(
                        "absolute w-5 h-5 transition-all duration-300 opacity-0 rotate-0",
                        isMenuOpen && "rotate-180 opacity-100"
                     )}
                  />
               </Button>
            </div>
            <div
               className={clsx(
                  "overflow-hidden max-h-0 transition-all duration-700 basis-full grow",
                  isMenuOpen ? "max-h-96" : "md:max-h-max"
               )}
            >
               <div className='flex flex-col animate-left gap-4 mt-5 md:flex-row md:items-center md:justify-end md:mt-0 md:pl-5'>
                  <ThemeSwitcher />
                  <NavLink
                     href='#home'
                     active={active === "home"}
                  >
                     Home
                  </NavLink>
                  <NavLink
                     href='#services'
                     active={active === "services"}
                  >
                     Services
                  </NavLink>
                  <NavLink
                     href='#features'
                     active={active === "features"}
                  >
                     Features
                  </NavLink>
                  <NavLink
                     href='#testimonials'
                     active={active === "testimonials"}
                  >
                     Testimonials
                  </NavLink>
                  <NavLink
                     href='#pricing'
                     active={active === "pricing"}
                  >
                     Pricing
                  </NavLink>
                  <Link
                     href='/login'
                     className='text-base font-medium text-neutral-600/95 rounded-md dark:text-neutral-300/70 dark:border-neutral-700/90 hover:border-neutral-200 dark:hover:text-neutral-600 hover:text-gray-400 md:border md:px-4 md:py-1 md:text-sm md:hover:bg-neutral-100 md:hover:text-neutral-600 md:dark:hover:text-neutral-300 md:dark:hover:bg-neutral-800/70'
                  >
                     Sign In
                  </Link>
               </div>
            </div>
         </nav>
      </header>
   );
};

export default Navbar;
