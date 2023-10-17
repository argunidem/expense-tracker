"use client";

import ExpensesCharts from "./expenses-charts";
import ExpensesTable from "./table/expenses-table";
import { Separator } from "@/components/ui/separator";
import { useExpenses } from "@/hooks/use-expenses";
import { useBudgets } from "@/hooks/use-budgets";
import ExpensesStats from "./expenses-stats";

const ExpensesDashboard = () => {
   const {
      getExpenses: { data: expenses },
   } = useExpenses();
   const {
      getBudgets: { data: budgets },
   } = useBudgets();

   return (
      <>
         <ExpensesStats data={budgets || []} />
         <Separator className='my-4' />
         <ExpensesCharts
            expensesChartData={expenses || []}
            budgetData={budgets || []}
         />
         <Separator className='my-4' />
         <ExpensesTable data={expenses || []} />
      </>
   );
};

export default ExpensesDashboard;
