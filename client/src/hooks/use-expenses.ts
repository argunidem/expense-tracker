import { useRouter } from "next/navigation";
import request from "@/utils/request";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { mapTransactionsData } from "@/utils/data-mappers/transactions";
import { MappedExpenseData } from "@/interfaces/expense";

export const getExpensesFn = async (cookies?: string) => {
   try {
      const { data } = await request.get("/expenses?sort=date", {
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

export const useExpenses = () => {
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
      getExpenses: useQuery({
         queryKey: ["expenses"],
         queryFn: () => getExpensesFn(),
         onSuccess: () => onSuccess(),
         onError,
         select: ({ data }) => mapTransactionsData(data) as MappedExpenseData[],
         refetchOnMount: false,
         refetchOnWindowFocus: false,
      }),
   };
};
