import { Check } from "lucide-react";
import { Button } from "../../ui/button";

interface PlanProps {
   plan: {
      name: string;
      price: number;
      features: string[];
   };
}

const Plan = ({ plan: { name, price, features } }: PlanProps) => {
   return (
      <div className='w-full flex flex-col flex-grow overflow-hidden mx-8 bg-white rounded-lg shadow-lg dark:bg-zinc-900/90 dark:border dark:border-neutral-800 sm:w-auto sm:mx-0'>
         <div className='flex flex-col items-center p-10 bg-gray-200 dark:bg-neutral-950/30 md:p-16'>
            <span className='font-semibold'>{name} Plan</span>
            <div className='flex items-center'>
               <span className='text-3xl'>$</span>
               <span className='text-5xl font-bold'>{price}</span>
               <span className='text-2xl text-gray-500'>/mo</span>
            </div>
         </div>
         <div className='p-10'>
            <ul>
               {features.map((feature, index) => (
                  <ListItem
                     key={index}
                     feature={feature}
                  />
               ))}
            </ul>
         </div>
         <div className='flex px-10 pb-10 justfy-center'>
            <Button
               variant={"default"}
               className='w-full h-12 text-sm font-semibold text-neutral-600/90 bg-gray-200 dark:bg-gray-500/20 dark:text-neutral-400 hover:bg-gray-300/70 hover:text-neutral-700/80'
            >
               JOIN NOW
            </Button>
         </div>
      </div>
   );
};

const ListItem = ({ feature }: { feature: string }) => {
   return (
      <li className='flex items-center'>
         <Check
            size={15}
            className='text-emerald-500'
         />
         <span className='ml-2'>{feature}</span>
      </li>
   );
};

export default Plan;
