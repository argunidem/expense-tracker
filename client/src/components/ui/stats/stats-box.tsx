import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface StatsProps {
   label: string;
   value: number;
   tooltip: string;
}

const StatsBox = ({ label, value, tooltip }: StatsProps) => {
   return (
      <Tooltip>
         <TooltipTrigger>
            <div className='transition-all duration-500 text-start py-4 px-7 space-y-3 rounded-md min-w-[200px] shadow-sm bg-gray-100 dark:bg-neutral-800/30 md:w-56 2xl:w-64 2xl:pl-10 border border-transparent hover:border-gray-100 dark:hover:border-gray-600/70 hover:bg-transparent dark:hover:bg-transparent'>
               <h3 className='dark:opacity-80'>{label}</h3>
               <p className='text-2xl px-2 opacity-95 dark:opacity-90'>
                  {value.toLocaleString("en-US", {
                     style: "currency",
                     currency: "USD",
                     minimumFractionDigits: 2,
                  })}
               </p>
            </div>
         </TooltipTrigger>
         <TooltipContent>
            <p className='py-2 px-4'>{tooltip}</p>
         </TooltipContent>
      </Tooltip>
   );
};

export default StatsBox;
