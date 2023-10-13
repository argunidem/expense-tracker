"use client";

import ExpensesCharts from "./expenses-charts";
import ExpensesTable from "./table/expenses-table";
import { Separator } from "@/components/ui/separator";
import { useExpenses } from "@/hooks/use-expenses";
import { useBudgets } from "@/hooks/use-budgets";
import {
   calculateAllExpenses,
   calculateExpensesComparison,
   calculateMonthlyExpenses,
   mapTableData,
} from "@/utils/expenses";

const ExpensesDashboard = () => {
   const {
      getExpenses: { data: expenses },
   } = useExpenses();
   const {
      getBudgets: { data: budgets },
   } = useBudgets();

   //! Map expenses and incomes data for comparison chart
   const expensesComparison = calculateExpensesComparison(budgets?.data || []);

   //! Map monthly expenses data for chart
   const monthlyExpenses = calculateMonthlyExpenses(budgets?.data || []);

   //! Map all expenses data for chart
   const allExpenses = calculateAllExpenses(expenses?.data || []);

   //! Map expenses data for table
   const expensesTableData = mapTableData(expenses?.data || []);

   return (
      <>
         <ExpensesCharts
            expensesChartData={allExpenses}
            monthlyData={monthlyExpenses}
            comparisonData={expensesComparison}
         />
         <Separator className='my-4' />
         <ExpensesTable data={expensesTableData} />
      </>
   );
};

export default ExpensesDashboard;
