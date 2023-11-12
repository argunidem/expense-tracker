"use client";

import CreateTransaction from "@/components/sections/transaction/create-transaction";
import MenuItem from "./menu-item";
import ThemeSwitcher from "@/components/theme/theme-switcher";
import { items } from "@/constants/sidebar-items";
import { Separator } from "../separator";

const SidebarMenu = () => {
   return (
      <div className='flex flex-col items-center justify-center gap-y-3 w-full h-full pb-56 lg:items-end lg:pr-12'>
         <span className='px-3'>
            <ThemeSwitcher />
         </span>
         <CreateTransaction locatedIn='Sidebar' />
         <Separator className='my-1 lg:-mr-6' />
         {items.map((item, index) => (
            <MenuItem
               key={index}
               data={item}
            />
         ))}
         <Separator className='mt-2 lg:-mr-6' />
      </div>
   );
};

export default SidebarMenu;
