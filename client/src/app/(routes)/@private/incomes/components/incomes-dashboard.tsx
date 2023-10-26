"use client";

import StatsContainer from "@/components/ui/stats/stats-container";
import IncomesCharts from "./incomes-charts";
import TableContainer from "@/components/ui/table/table-container";
import { Separator } from "@/components/ui/separator";

import { useIncomes } from "@/hooks/use-incomes";
import { useBudgets } from "@/hooks/use-budgets";
import { columns } from "./table-columns";
import { mapTransactionStats } from "@/utils/data-mappers/stats";

const IncomesDashboard = () => {
   const {
      getIncomes: { data: incomes },
   } = useIncomes();
   const {
      getBudgets: { data: budgets },
   } = useBudgets();

   const stats = mapTransactionStats(budgets || [], "income");

   return (
      <>
         <StatsContainer data={stats} />
         <Separator className='my-4' />
         <IncomesCharts
            incomesChartData={incomes || []}
            budgetData={budgets || []}
         />
         <Separator className='my-4' />
         <TableContainer
            data={incomes || []}
            columns={columns}
            searchBy={"source"}
         />
      </>
   );
};

export default IncomesDashboard;
