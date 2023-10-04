import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { LucideIcon } from "lucide-react";

interface MenuItemProps {
   data: {
      icon: LucideIcon;
      text: string;
      href?: string;
   };
}

const MenuItem = ({ data: { icon: Icon, text, href } }: MenuItemProps) => {
   const Item = href ? Link : "button";

   const {
      useLogout: { refetch },
   } = useAuth();

   const handleClick = async () => {
      refetch();
   };

   return (
      <Item
         href={href || ""}
         title={text}
         onClick={href ? undefined : handleClick}
         className='flex items-center justify-center py-1.5 px-2 transition-all duration-300 rounded-md bg-neutral-200/50 dark:bg-neutral-400/5 hover:bg-neutral-300/50 dark:hover:bg-neutral-800 lg:space-x-1 lg:bg-transparent dark:lg:bg-transparent lg:hover:hover:bg-transparent lg:hover:opacity-70 lg:py-2 lg:px-3'
      >
         <span className='hidden lg:inline xl:text-lg'>{text}</span>
         <Icon className='text-neutral-600 dark:text-neutral-300 lg:p-0.5' />
      </Item>
   );
};

export default MenuItem;
