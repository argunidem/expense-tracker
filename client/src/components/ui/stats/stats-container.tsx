interface StatsContainerProps {
   children: React.ReactNode;
}

const StatsContainer = ({ children }: StatsContainerProps) => {
   return (
      <div className='flex space-x-2 py-4 mx-6 overflow-x-auto sm:space-x-4 md:py-6 2xl:space-x-12'>
         {children}
      </div>
   );
};

export default StatsContainer;
