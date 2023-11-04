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
         label: "This Month",
         value: currentMonth,
         tooltip: `Total amount of money you've ${action} this month.`,
      },
      {
         label: "Monthly Average",
         value: (totalAmount || 0) / (budgets?.length || 0),
         tooltip: `Average amount of money you've ${action} per month.`,
      },
   ];
};

export { mapTransactionStats };
