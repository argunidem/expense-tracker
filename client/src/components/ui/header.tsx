import CreateTransaction from "../sections/private/transaction/create-transaction";

interface HeaderProps {
   title: string;
   subtitle?: string;
}

const Header = ({ title, subtitle }: HeaderProps) => {
   return (
      <div className='px-6'>
         <h1 className='text-sm font-light dark:font-extralight dark:text-neutral-400'>
            / {title}
         </h1>

         <div className='flex justify-between items-center my-4'>
            <h3 className='ml-2 text-2xl font-semibold dark:text-neutral-300'>
               {subtitle ? subtitle : "Overview"}
            </h3>
            {(title === "Expenses" || title === "Incomes") && (
               <CreateTransaction
                  title={title}
                  locatedIn='Header'
               />
            )}
         </div>
      </div>
   );
};

export default Header;
