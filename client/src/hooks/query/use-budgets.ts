import { makeRequest } from "@/utils/request";
import { useQuery } from "@tanstack/react-query";
import { mapBudgetData } from "@/utils/data-mappers/budget";
import { useToast } from "../use-toast";
import { BudgetsResponse } from "@/interfaces/budget";

export const useBudgets = () => {
   const { toast } = useToast();

   const onError = (error: any) => {
      toast({
         description: error.message,
         variant: "destructive",
      });
   };

   return {
      getBudgets: useQuery({
         queryKey: ["budgets"],
         queryFn: () => makeRequest<BudgetsResponse>("/budgets"),
         onError,
         select: ({ data }) => mapBudgetData(data),
         refetchOnMount: false,
         refetchOnWindowFocus: false,
      }),
   };
};
