import { Budget } from "@/interfaces/budget";
import { MappedBudgetData } from "@/interfaces/budget";
import { formatDate } from "../format-date";

export const mapBudgetData = (data: Budget[]): MappedBudgetData[] => {
   const budgets = data.map((budget: Budget) => {
      const formattedDate = formatDate(budget.month, "MM-yyyy");
      return {
         ...(({ month, summary, ...rest }) => ({
            income: summary.totalIncome,
            expense: summary.totalExpense,
            balance: summary.balance,
            ...rest,
         }))(budget),
         date: formattedDate,
      };
   });

   return budgets.sort((a, b) => {
      return new Date(a.name).getTime() - new Date(b.name).getTime();
   });
};

export const mapPieChartData = (data: MappedBudgetData[]) => {
   return {
      totalChartData: [
         {
            name: "Income",
            amount: data.reduce((acc, budget) => acc + budget.income, 0),
         },
         {
            name: "Expense",
            amount: data.reduce((acc, budget) => acc + budget.expense, 0),
         },
      ],
      currentMonthData: [
         {
            name: "Income",
            amount: data[data.length - 1]?.income || 0,
         },
         {
            name: "Expense",
            amount: data[data.length - 1]?.expense || 0,
         },
      ],
   };
};
