import ExpensesHeader from "./components/expenses-header";
import ExpensesStats from "./components/expenses-stats";
import ExpensesDashboard from "./components/expenses-dashboard";
import { Separator } from "@/components/ui/separator";

const ExpensesPage = () => {
   return (
      <>
         <ExpensesHeader />
         <Separator className='my-4' />
         <ExpensesStats />
         <Separator className='my-4' />
         <ExpensesDashboard />
      </>
   );
};

export default ExpensesPage;
