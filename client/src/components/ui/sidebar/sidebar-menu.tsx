"use client";

import CreateTransaction from "@/components/create-transaction";
import MenuItem from "./menu-item";
import ThemeSwitcher from "@/components/theme/theme-switcher";
import { items } from "@/constants/sidebar-items";

const SidebarMenu = () => {
   return (
      <div className='flex flex-col items-center justify-center space-y-3 w-full h-full pb-56 lg:items-end lg:pr-12'>
         <span className='px-3'>
            <ThemeSwitcher />
         </span>
         <CreateTransaction locatedIn='Sidebar' />
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
