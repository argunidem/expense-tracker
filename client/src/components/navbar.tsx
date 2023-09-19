"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Menu, X } from "lucide-react";

import ThemeSwitcher from "./theme-switcher";
import { Button } from "./ui/button";
import NavLink from "./ui/link";

const Navbar = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   return (
      <header className='fixed flex sm:justify-start z-50 w-full bg-white text-sm py-4 dark:bg-zinc-900'>
         <nav className='max-w-[1600px] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between md:py-[3px]'>
            <div className='flex items-center justify-between'>
               <Link
                  href='/'
                  className='flex-none animate-right font-black text-xl text-neutral-800/95 dark:text-white'
               >
                  ExpenseTracker
               </Link>
               <Button
                  className='relative'
                  variant={"primary"}
                  border={"default"}
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
                  isMenuOpen ? "max-h-96" : "sm:max-h-max"
               )}
            >
               <div className='flex flex-col animate-left gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:pl-5'>
                  <ThemeSwitcher />
                  <NavLink
                     href='#'
                     active
                     label='Landing'
                  />
                  <NavLink
                     href='#'
                     label='Account'
                  />
                  <NavLink
                     href='#'
                     label='Work'
                  />
                  <NavLink
                     href='#'
                     label='Blog'
                  />
               </div>
            </div>
         </nav>
      </header>
   );
};

export default Navbar;
