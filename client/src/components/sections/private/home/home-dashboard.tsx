"use client";

import StatsContainer from "@/components/ui/stats/stats-container";
import HomeCharts from "@/components/sections/private/home/home-charts";
import HomeTables from "./home-tables";
import { useTransactions } from "@/hooks/query/use-transactions";
import { useBudgets } from "@/hooks/query/use-budgets";
import { mapBudgetStats } from "@/utils/data-mappers/stats";
import { Separator } from "@/components/ui/separator";

const HomeDashboard = () => {
   const {
      getTransactions: { data: transactions },
   } = useTransactions();
   const {
      getBudgets: { data: budgets },
   } = useBudgets();

   const stats = mapBudgetStats(budgets || []);

   return (
      <>
         <StatsContainer data={stats} />
         <Separator className='my-4' />
         <HomeCharts
            budgetData={budgets || []}
            transactionData={transactions}
         />
         <Separator className='my-4' />
         <HomeTables data={{ budgets, transactions }} />
      </>
   );
};

export default HomeDashboard;
