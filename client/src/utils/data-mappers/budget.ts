import { Budget } from "@/interfaces/budget";
import { MappedBudgetData } from "@/interfaces/budget";
import { formatDate } from "../format-date";

export const mapBudgetData = (data: Budget[]): MappedBudgetData[] => {
   const budgets = data.map((budget: Budget) => {
      const formattedDate = formatDate(budget.month, "MM-yyyy");
      return {
         ...(({ _id: id, month, summary, ...rest }) => ({
            id,
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
