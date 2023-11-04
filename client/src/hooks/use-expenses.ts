import { useRouter } from "next/navigation";
import { makeRequest } from "@/utils/request";
import { useMutation, useQuery } from "@tanstack/react-query";
import { mapTransactionsData } from "@/utils/data-mappers/transactions";
import { z } from "zod";
import { expenseSchema } from "@/schemas/expense-schema";
import { useToast } from "./use-toast";
import { ExpenseResponse, ExpensesResponse, MappedExpenseData } from "@/interfaces/expense";
import { DeleteTransactionResponse, TransactionValues } from "@/interfaces/transaction";

export const useExpenses = () => {
   const { refresh } = useRouter();
   const { toast } = useToast();

   const onError = (error: any) => {
      toast({
         description: error.message,
         variant: "destructive",
      });
   };

   const onSuccess = (message: string) => {
      toast({
         description: message,
      });
      refresh();
   };

   return {
      getExpenses: useQuery({
         queryKey: ["expenses"],
         queryFn: () => makeRequest<ExpensesResponse>("/expenses", { params: { sort: "date" } }),
         onError,
         select: ({ data }) => mapTransactionsData(data) as MappedExpenseData[],
         refetchOnMount: false,
         refetchOnWindowFocus: false,
      }),
      createExpense: useMutation({
         mutationFn: (values: TransactionValues) =>
            makeRequest("/expenses", { method: "POST", values }),
         onSuccess: () => onSuccess("Expense created"),
         onError,
      }),
      updateExpense: useMutation<ExpenseResponse, any, { id: string; values: TransactionValues }>({
         mutationFn: ({ id, values }) =>
            makeRequest<ExpenseResponse>(`/expenses/${id}`, { method: "PUT", values }),
         onSuccess: () => onSuccess("Expense updated"),
         onError,
      }),
      deleteExpense: useMutation({
         mutationFn: (id: string) =>
            makeRequest<DeleteTransactionResponse>(`/expenses/${id}`, { method: "DELETE" }),
         onSuccess: (data: DeleteTransactionResponse) => onSuccess(data.message),
         onError,
      }),
   };
};
