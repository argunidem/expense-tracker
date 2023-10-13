import { Landmark } from "lucide-react";
import SidebarMenu from "./sidebar-menu";

const Sidebar = () => {
   return (
      <nav className='fixed top-0 left-0 z-20 w-[80px] max-w-[280px] h-full border-r duration-300 bg-white dark:bg-neutral-900/80 dark:border-gray-600/30 lg:w-1/4'>
         <div className='mt-10'>
            <Landmark
               size={30}
               className='mx-auto lg:hidden'
            />
            <h1 className='hidden text-center font-black text-2xl dark:text-neutral-300 lg:block xl:text-[26px]'>
               XpenseWise
            </h1>
         </div>
         <SidebarMenu />
      </nav>
   );
};

export default Sidebar;
