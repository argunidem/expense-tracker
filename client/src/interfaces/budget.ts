export interface Budget {
   name: string;
   amount: number;
   month: string;
   user: string;
   timestamp: number;
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
