export interface Expense {
   name?: string;
   description?: string;
   category: string;
   amount: number;
   date: string;
   regular: boolean;
   budgets: string[];
   expiresAt?: string;
   user: string;
   _id: string;
}

export interface MappedExpenseData extends Omit<Expense, "amount" | "_id"> {
   expense: number;
   id: string;
}
