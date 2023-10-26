"use client";

import StatsContainer from "@/components/ui/stats/stats-container";
import ExpensesCharts from "./expenses-charts";
import TableContainer from "@/components/ui/table/table-container";
import { Separator } from "@/components/ui/separator";

import { useExpenses } from "@/hooks/use-expenses";
import { useBudgets } from "@/hooks/use-budgets";
import { columns } from "./table-columns";
import { mapTransactionStats } from "@/utils/data-mappers/stats";

const ExpensesDashboard = () => {
   const {
      getExpenses: { data: expenses },
   } = useExpenses();
   const {
      getBudgets: { data: budgets },
   } = useBudgets();

   const stats = mapTransactionStats(budgets || [], "expense");

   return (
      <>
         <StatsContainer data={stats} />
         <Separator className='my-4' />
         <ExpensesCharts
            expensesChartData={expenses || []}
            budgetData={budgets || []}
         />
         <Separator className='my-4' />
         <TableContainer
            columns={columns}
            data={expenses || []}
            searchBy={"category"}
         />
      </>
   );
};

export default ExpensesDashboard;
