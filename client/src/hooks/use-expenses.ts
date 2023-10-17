import { useRouter } from "next/navigation";
import request from "@/utils/request";
import { useQuery } from "@tanstack/react-query";
import { mapExpensesData } from "@/utils/data-mappers/expenses";
import { useToast } from "./use-toast";

export const getExpensesFn = async (cookies?: any) => {
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
         select: ({ data }) => mapExpensesData(data),
         refetchOnMount: false,
         refetchOnWindowFocus: false,
      }),
   };
};
