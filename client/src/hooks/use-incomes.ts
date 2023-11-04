import { useRouter } from "next/navigation";
import { makeRequest } from "@/utils/request";
import { useMutation, useQuery } from "@tanstack/react-query";
import { mapTransactionsData } from "@/utils/data-mappers/transactions";
import { z } from "zod";
import { incomeSchema } from "@/schemas/income-schema";
import { useToast } from "./use-toast";
import { IncomeResponse, IncomesResponse, MappedIncomeData } from "@/interfaces/income";
import { DeleteTransactionResponse, TransactionValues } from "@/interfaces/transaction";

export const useIncomes = () => {
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
      getIncomes: useQuery({
         queryKey: ["incomes"],
         queryFn: () => makeRequest<IncomesResponse>("/incomes", { params: { sort: "date" } }),
         onError,
         select: ({ data }) => mapTransactionsData(data) as MappedIncomeData[],
         refetchOnMount: false,
         refetchOnWindowFocus: false,
      }),
      createIncome: useMutation({
         mutationFn: (values: TransactionValues) =>
            makeRequest("/incomes", { method: "POST", values }),
         onSuccess: () => onSuccess("Income created"),
         onError,
      }),
      updateIncome: useMutation<IncomeResponse, any, { id: string; values: TransactionValues }>({
         mutationFn: ({ id, values }) =>
            makeRequest<IncomeResponse>(`/incomes/${id}`, { method: "PUT", values }),
         onSuccess: () => onSuccess("Income updated"),
         onError,
      }),
      deleteIncome: useMutation({
         mutationFn: (id: string) =>
            makeRequest<DeleteTransactionResponse>(`/incomes/${id}`, { method: "DELETE" }),
         onSuccess: (data: DeleteTransactionResponse) => onSuccess(data.message),
         onError,
      }),
   };
};
