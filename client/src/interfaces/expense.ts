import { z } from "zod";
import { expenseSchema } from "@/schemas/expense-schema";

export interface Expense extends z.infer<typeof expenseSchema> {
   budgets: string[];
   expiresAt?: string;
   user: string;
   _id: string;
}

export interface ExpenseResponse {
   status: boolean;
   data: Expense;
}

export interface ExpensesResponse {
   status: boolean;
   data: Expense[];
}

export interface MappedExpenseData extends Omit<Expense, "amount" | "_id"> {
   expense: number;
   id: string;
}
