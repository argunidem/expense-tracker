import Link from "next/link";
import clsx from "clsx";

interface NavLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
   href: string;
   active?: boolean;
   label: string;
}

const ActiveClasses = "font-medium text-blue-500 dark:text-white";
const InactiveClasses =
   "font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500";

const NavLink = ({ href, label, active }: NavLinkProps) => {
   return (
      <Link
         href={href}
         className={clsx("font-medium", active ? ActiveClasses : InactiveClasses)}
      >
         {label}
      </Link>
   );
};

export default NavLink;
