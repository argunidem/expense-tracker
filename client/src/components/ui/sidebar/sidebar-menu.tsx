"use client";

import ThemeSwitcher from "@/components/theme-switcher";
import { items } from "@/constants/sidebar-items";
import MenuItem from "./menu-item";

const SidebarMenu = () => {
   return (
      <div className='flex flex-col items-center justify-center space-y-3 w-full h-full pb-56 lg:items-end lg:pr-12'>
         <span className='px-3'>
            <ThemeSwitcher />
         </span>
         {items.map((item, index) => (
            <MenuItem
               key={index}
               data={item}
            />
         ))}
      </div>
   );
};

export default SidebarMenu;
