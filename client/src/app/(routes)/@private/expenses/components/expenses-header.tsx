interface HeaderProps {
   title: string;
}

const ExpensesHeader = ({ title }: HeaderProps) => {
   return (
      <div className='px-6'>
         <h1 className='text-sm font-light dark:font-extralight dark:text-neutral-400'>
            / {title}
         </h1>
         <h3 className='ml-2 my-4 text-2xl font-semibold dark:text-neutral-300'>Overview</h3>
      </div>
   );
};

export default ExpensesHeader;
