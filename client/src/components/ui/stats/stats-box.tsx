interface StatsProps {
   label: string;
   value: number;
}

const StatsBox = ({ label, value }: StatsProps) => {
   return (
      <div className='py-4 px-7 space-y-3 rounded-md min-w-[200px] shadow-sm bg-gray-500/5 dark:bg-neutral-800/30 md:w-56 hover:bg-opacity-90'>
         <h3 className='dark:opacity-80'>{label}</h3>
         <p className='text-2xl px-2 opacity-95 dark:opacity-90'>$ {value.toFixed(2)}</p>
      </div>
   );
};

export default StatsBox;
