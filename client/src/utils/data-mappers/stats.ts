import { MappedBudgetData } from "@/interfaces/budget";

const mapTransactionStats = (budgets: MappedBudgetData[], type: "income" | "expense") => {
   const totalAmount = budgets?.reduce((acc, curr) => acc + curr[type], 0);
   const currentMonth = budgets?.slice(-1)[0][type];
   const action = type === "expense" ? "spent" : "earned";

   return [
      {
         label: `Total ${type === "expense" ? "Expense" : "Income"}`,
         value: totalAmount,
         tooltip: `Total amount of money you've ${action} so far.`,
      },
      {
         label: "Monthly Average",
         value: (totalAmount || 0) / (budgets?.length || 0),
         tooltip: `Average amount of money you've ${action} per month.`,
      },
      {
         label: "This Month",
         value: currentMonth,
         tooltip: `Total amount of money you've ${action} this month.`,
      },
   ];
};

const mapBudgetStats = (budgets: MappedBudgetData[]) => {
   const totalBalance = budgets?.reduce((acc, curr) => acc + curr.balance, 0);
   const currentMonth = budgets?.slice(-1)[0].balance;
   const averageBalance = (totalBalance || 0) / (budgets?.length || 0);

   return [
      {
         label: "Total balance",
         value: totalBalance,
         tooltip: "Total balance of all your budgets.",
      },
      {
         label: "Average Balance",
         value: averageBalance,
         tooltip: "Average monthly balance.",
      },
      {
         label: "This Month",
         value: currentMonth,
         tooltip: "Total balance of this month.",
      },
      {
         label: "Highest Balance",
         value: Math.max(...budgets?.map((budget) => budget.balance)),
         tooltip: "Highest balance ever recorded.",
      },
      {
         label: "Lowest Balance",
         value: Math.min(...budgets?.map((budget) => budget.balance)),
         tooltip: "Lowest balance ever recorded.",
      },
   ];
};

export { mapTransactionStats, mapBudgetStats };
