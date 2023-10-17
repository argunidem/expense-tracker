import ExpensesHeader from "./components/expenses-header";
import ExpensesDashboard from "./components/expenses-dashboard";
import { Separator } from "@/components/ui/separator";

const ExpensesPage = () => {
   return (
      <>
         <ExpensesHeader title={"Expenses"} />
         <Separator className='my-4' />
         <ExpensesDashboard />
      </>
   );
};

export default ExpensesPage;
