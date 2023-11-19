import { cn } from "@/utils/cn";
import { ResponsiveContainer } from "recharts";

interface ChartContainerProps {
   children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
   title: string;
   dataExists: boolean;
}

const ChartContainer = ({ children, title, dataExists }: ChartContainerProps) => {
   return (
      <div className='w-full pb-8 rounded-md transition-all duration-300 sm:px-2 md:px-12 2xl:px-0 sm:hover:bg-gray-500/5 dark:sm:hover:bg-neutral-800/20'>
         <h3 className='font-semibold dark:text-neutral-300 m-7 mb-9'>{title}</h3>
         <div className={cn("mx-auto h-80 2xl:max-w-4xl 2xl:h-96", !dataExists && "px-2")}>
            <ResponsiveContainer
               width='100%'
               height='100%'
               className={cn(
                  "flex justify-center items-center",
                  !dataExists && "border rounded-md dark:border-gray-700/30"
               )}
            >
               {dataExists ? (
                  children
               ) : (
                  <h3 className='text-xl dark:text-neutral-400'>No data to display</h3>
               )}
            </ResponsiveContainer>
         </div>
      </div>
   );
};

export default ChartContainer;
