import { Budget } from "@/interfaces/budget";
import { MappedBudgetData } from "@/interfaces/budget";
import { formatDate } from "../format-date";

export const mapBudgetData = (data: Budget[]): MappedBudgetData[] => {
   const budgets = data.map((budget: Budget) => {
      const {
         name,
         month,
         summary: { totalIncome, totalExpense, balance },
      } = budget;

      const formattedDate = formatDate(month, "MM-yyyy");

      return {
         name,
         month,
         date: formattedDate,
         expense: totalExpense,
         income: totalIncome,
      };
   });

   return budgets.sort((a, b) => {
      return new Date(a.month).getTime() - new Date(b.month).getTime();
   });
};
