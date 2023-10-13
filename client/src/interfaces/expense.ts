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

export interface MappedExpense {
   name?: string;
   date: string;
   expense: number;
}

export interface ExpensesComparison {
   name: string;
   month: string;
   income: number;
   expense: number;
}

export interface ExpenseTableData {
   amount: number;
   date: string;
   regular: boolean;
   category: string;
   id: string;
}
