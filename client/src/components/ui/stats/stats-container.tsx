import StatsBox from "./stats-box";

interface Stats {
   label: string;
   value?: number;
   tooltip: string;
}

interface StatsContainerProps {
   data: Stats[];
}

const StatsContainer = ({ data }: StatsContainerProps) => {
   return (
      <div className='flex space-x-2 py-4 mx-6 overflow-x-auto sm:space-x-4 md:py-6 2xl:space-x-12'>
         {data.map((item: Stats, index: number) => (
            <StatsBox
               key={index}
               label={item.label}
               value={item.value || 0}
               tooltip={item.tooltip}
            />
         ))}
      </div>
   );
};

export default StatsContainer;
