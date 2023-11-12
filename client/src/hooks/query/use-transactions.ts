import { useRouter } from "next/navigation";
import { makeRequest } from "@/utils/request";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import {
   DeleteTransactionResponse,
   TransactionResponse,
   TransactionValues,
   TransactionsResponse,
} from "@/interfaces/transaction";

export const useTransactions = () => {
   const queryClient = useQueryClient();
   const { refresh } = useRouter();
   const { toast } = useToast();

   const onError = (error: any) => {
      toast({
         description: error.message,
         variant: "destructive",
      });
   };

   const onSuccess = (message: string, queryKey?: string) => {
      toast({
         description: message,
      });
      refresh();
      if (queryKey) queryClient.invalidateQueries({ queryKey: [queryKey] });
   };

   return {
      getTransactions: useQuery({
         queryKey: ["transactions"],
         queryFn: () =>
            makeRequest<TransactionsResponse>("/transactions", {
               params: { sort: "date", populate: "category" },
            }),
         onError,
         select: ({ data }) => data,
         refetchOnMount: false,
         refetchOnWindowFocus: false,
      }),
      createTransaction: useMutation({
         mutationFn: (values: TransactionValues) =>
            makeRequest("/transactions", { method: "POST", values }),
         onSuccess: () => onSuccess("Transaction created", "categories"),
         onError,
      }),
      updateTransaction: useMutation<
         TransactionResponse,
         any,
         { id: string; values: TransactionValues }
      >({
         mutationFn: ({ id, values }) =>
            makeRequest<TransactionResponse>(`/transactions/${id}`, { method: "PUT", values }),
         onSuccess: () => onSuccess("Transaction updated", "categories"),
         onError,
      }),
      deleteTransaction: useMutation({
         mutationFn: (id: string) =>
            makeRequest<DeleteTransactionResponse>(`/transactions/${id}`, { method: "DELETE" }),
         onSuccess: (data: DeleteTransactionResponse) => onSuccess(data.message, "categories"),
         onError,
      }),
   };
};
