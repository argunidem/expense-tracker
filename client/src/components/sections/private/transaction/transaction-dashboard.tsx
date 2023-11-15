"use client";

import StatsContainer from "@/components/ui/stats/stats-container";
import TransactionCharts from "@/components/sections/private/transaction/transaction-charts";
import TableContainer from "@/components/ui/table/table-container";
import { columns } from "@/components/sections/private/transaction/transaction-columns";
import { useTransactions } from "@/hooks/query/use-transactions";
import { useBudgets } from "@/hooks/query/use-budgets";
import { mapTransactionStats } from "@/utils/data-mappers/stats";
import { Separator } from "@/components/ui/separator";

interface TransactionDashboardProps {
   transactionType: "income" | "expense";
}

const TransactionDashboard = ({ transactionType }: TransactionDashboardProps) => {
   const {
      getTransactions: { data: transactions },
   } = useTransactions();
   const {
      getBudgets: { data: budgets },
   } = useBudgets();

   const stats = mapTransactionStats(budgets || [], transactionType);
   const data = transactionType === "income" ? transactions?.incomes : transactions?.expenses;

   return (
      <>
         <StatsContainer data={stats} />
         <Separator className='my-4' />
         <TransactionCharts
            transactionData={data || []}
            budgetData={budgets || []}
            transactionType={transactionType}
         />
         <Separator className='my-4' />
         <TableContainer
            data={data || []}
            columns={columns}
            searchBy={"category"}
         />
      </>
   );
};

export default TransactionDashboard;
