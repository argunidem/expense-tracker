import ExpensesHeader from "@/components/ui/header";
import TransactionDashboard from "@/components/sections/transaction/transaction-dashboard";
import { Separator } from "@/components/ui/separator";

const ExpensesPage = () => {
   return (
      <>
         <ExpensesHeader title={"Expenses"} />
         <Separator className='my-4' />
         <TransactionDashboard transactionType={"expense"} />
      </>
   );
};

export default ExpensesPage;
