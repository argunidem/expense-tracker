import { useRouter } from "next/navigation";
import request from "@/utils/request";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { mapTransactionsData } from "@/utils/data-mappers/transactions";
import { MappedIncomeData } from "@/interfaces/income";

export const getIncomesFn = async (cookies?: string) => {
   try {
      const { data } = await request.get("/incomes?sort=date", {
         headers: {
            Cookie: cookies,
         },
         withCredentials: true,
      });
      return data;
   } catch (error: any) {
      throw new Error(error.response.data.message || "Something went wrong");
   }
};

export const useIncomes = () => {
   const { refresh } = useRouter();
   const { toast } = useToast();

   const onError = (error: any) => {
      toast({
         description: error.message,
         variant: "destructive",
      });
   };

   const onSuccess = () => {
      // refresh();
   };

   return {
      getIncomes: useQuery({
         queryKey: ["incomes"],
         queryFn: () => getIncomesFn(),
         onSuccess: () => onSuccess(),
         onError,
         select: ({ data }) => mapTransactionsData(data) as MappedIncomeData[],
         refetchOnMount: false,
         refetchOnWindowFocus: false,
      }),
   };
};
