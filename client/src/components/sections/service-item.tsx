import { LucideIcon } from "lucide-react";

interface ServiceItemProps {
   icon: LucideIcon;
   title: string;
   description: string;
}

const ServiceItem = ({ icon: Icon, title, description }: ServiceItemProps) => {
   return (
      <div className='flex flex-col items-center space-y-5 px-9 py-16 border rounded-md border-slate-100 transition-all duration-300 text-center dark:hover:bg-neutral-950/10 dark:border-neutral-800/40 hover:shadow-lg hover:bg-gray-100 sm:px-12'>
         <Icon
            size={70}
            className='dark:text-neutral-400'
         />
         <h4 className='text-lg font-semibold'>{title}</h4>
         <p className='text-sm font-light'>{description}</p>
      </div>
   );
};

export default ServiceItem;
