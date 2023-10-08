interface ChartContainerProps {
   children: React.ReactNode;
}

const ChartContainer = ({ children }: ChartContainerProps) => {
   return (
      <div className='w-full py-8 rounded-md transition-all duration-300 sm:pb-8 sm:pt-16 sm:px-2 md:px-12 2xl:px-0 2xl:w-1/2 sm:hover:bg-gray-500/5 dark:sm:hover:bg-neutral-800/20'>
         <div className='mx-auto h-80 2xl:max-w-4xl 2xl:h-96'>{children}</div>
      </div>
   );
};

export default ChartContainer;
