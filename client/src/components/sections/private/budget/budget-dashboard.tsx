"use client";

import StatsContainer from "@/components/ui/stats/stats-container";
import BudgetCharts from "./budget-charts";
import TableContainer from "@/components/ui/table/table-container";
import { columns } from "./budget-columns";
import { useBudgets } from "@/hooks/query/use-budgets";
import { mapBudgetStats } from "@/utils/data-mappers/stats";
import { Separator } from "@/components/ui/separator";

const BudgetDashboard = () => {
   const {
      getBudgets: { data },
   } = useBudgets();

   const stats = mapBudgetStats(data || []);

   return (
      <>
         <StatsContainer data={stats} />
         <Separator className='my-4' />
         <BudgetCharts budgetData={data || []} />
         <Separator className='my-4' />
         <TableContainer
            data={data || []}
            columns={columns}
         />
      </>
   );
};

export default BudgetDashboard;
