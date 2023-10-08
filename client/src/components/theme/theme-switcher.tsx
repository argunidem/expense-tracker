"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeSwitcher = () => {
   const { theme, setTheme } = useTheme();
   return (
      <div className='relative h-6 w-6'>
         <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title='dark mode'
         >
            <Moon className='text-neutral-200 p-0.5 absolute inset-0 -rotate-90 scale-0 dark:rotate-0 dark:scale-100' />
            <Sun className='text-neutral-700 p-0.5 absolute inset-0 rotate-0 scale-100 dark:rotate-90 dark:scale-0' />
         </button>
      </div>
   );
};

export default ThemeSwitcher;
