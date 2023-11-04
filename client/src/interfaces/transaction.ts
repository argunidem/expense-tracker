import { z } from "zod";
import { incomeSchema } from "@/schemas/income-schema";
import { expenseSchema } from "@/schemas/expense-schema";

export interface TransactionData {
   name?: string;
   description?: string;
   category?: string;
   source?: string;
   expense?: number;
   income?: number;
   date: string;
   regular?: boolean;
   budgets: string[];
   expiresAt?: string;
   user: string;
   id: string;
}

export type TransactionValues = z.infer<typeof incomeSchema> | z.infer<typeof expenseSchema>;

export interface DeleteTransactionResponse {
   status: string;
   message: string;
}
