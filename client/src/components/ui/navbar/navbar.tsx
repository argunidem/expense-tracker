"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { Button } from "../button";
import NavMenu from "./nav-menu";
import NavLink from "./nav-link";
import { cn } from "@/lib/utils";

const Navbar = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
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
            <NavMenu isMenuOpen={isMenuOpen} />
         </nav>
      </header>
   );
};

export default Navbar;
