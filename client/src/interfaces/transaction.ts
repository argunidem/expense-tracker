import { z } from "zod";
import { transactionSchema } from "@/schemas/transaction-schema";

export type TransactionValues = z.infer<typeof transactionSchema>;
export interface Transaction extends TransactionValues {
   budgets: string[];
   expiresAt?: string;
   user: string;
   _id: string;
}

export interface DeleteTransactionResponse {
   status: string;
   message: string;
}

export interface TransactionResponse {
   status: string;
   data: Transaction;
}

export interface TransactionsResponse {
   status: string;
   data: {
      incomes: Transaction[];
      expenses: Transaction[];
   };
}
