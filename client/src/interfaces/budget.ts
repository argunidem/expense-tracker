export interface Budget {
   name: string;
   month: string;
   user: string;
   timestamp: number;
   summary: {
      totalIncome: number;
      totalExpense: number;
      balance: number;
   };
   transactions: {
      expenses: {
         amount: number;
         date: string;
         _id: string;
      }[];
      incomes: {
         amount: number;
         date: string;
         _id: string;
      }[];
   };
   createdAt: string;
   updatedAt: string;
   _id: string;
}

export interface MappedBudgetData extends Omit<Budget, "_id" | "summary" | "month"> {
   income: number;
   expense: number;
   balance: number;
   date: string;
   id: string;
}
