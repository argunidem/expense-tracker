import { LucideIcon } from "lucide-react";

interface ServiceItemProps {
   icon: LucideIcon;
   title: string;
   description: string;
}

const ServiceItem = ({ icon: Icon, title, description }: ServiceItemProps) => {
   return (
      <div className='flex flex-col items-center space-y-5 px-12 py-16 border rounded-md border-slate-100 transition-all duration-300 text-center hover:bg-gray-100 dark:hover:bg-neutral-950/10 dark:border-neutral-800/40 hover:shadow-lg'>
         <Icon
            size={70}
            className='dark:text-neutral-400'
         />
         <h4 className='text-lg font-semibold dark:text-neutral-300'>{title}</h4>
         <p className='text-sm font-light dark:text-neutral-300'>{description}</p>
      </div>
   );
};

export default ServiceItem;
