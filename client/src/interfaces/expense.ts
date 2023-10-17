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

export interface MappedExpenseData {
   name?: string;
   date: string;
   expense: number;
   regular: boolean;
   category: string;
   id: string;
}
