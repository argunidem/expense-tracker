import BudgetsHeader from "@/components/ui/header";
import BudgetDashboard from "@/components/sections/private/budget/budget-dashboard";
import { Separator } from "@/components/ui/separator";

const BudgetsPage = () => {
   return (
      <>
         <BudgetsHeader title={"Budgets"} />
         <Separator className='my-4' />
         <BudgetDashboard />
      </>
   );
};

export default BudgetsPage;
