import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/query/use-auth";
import { LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";

interface MenuItemProps {
   data: {
      icon: LucideIcon;
      text: string;
      href?: string;
   };
}

const MenuItem = ({ data: { icon: Icon, text, href } }: MenuItemProps) => {
   const pathname = usePathname();
   const Item = href ? Link : "button";

   const {
      logout: { refetch },
   } = useAuth();

   const handleClick = () => {
      refetch();
   };

   return (
      <Item
         href={href || ""}
         title={text}
         onClick={href ? undefined : handleClick}
         className={cn(
            "flex items-center justify-center py-1.5 px-2 transition-all duration-300 rounded-md bg-neutral-200/50 dark:bg-neutral-400/5 hover:bg-neutral-300/50 dark:hover:bg-neutral-800 lg:space-x-1 lg:bg-transparent dark:lg:bg-transparent lg:hover:bg-transparent lg:hover:opacity-70 lg:py-2 lg:px-3",
            pathname === href
               ? "bg-black/80 dark:bg-gray-400/20 lg:bg-gray-400/20 lg:dark:bg-gray-600/30 hover:bg-black/70 lg:hover:bg-gray-400/30"
               : ""
         )}
      >
         <span className='hidden lg:inline xl:text-lg'>{text}</span>
         <Icon
            className={cn(
               "dark:text-neutral-300 lg:p-0.5",
               pathname === href ? "text-neutral-200 dark:text-white lg:text-gray-600" : ""
            )}
         />
      </Item>
   );
};

export default MenuItem;
