import { useRouter } from "next/navigation";
import request from "@/utils/request";
import { useQuery } from "@tanstack/react-query";
import { mapBudgetData } from "@/utils/data-mappers/budget";
import { useToast } from "./use-toast";

export const getBudgetsFn = async (cookies?: string) => {
   try {
      const { data } = await request.get("/budgets", {
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

export const useBudgets = () => {
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
      getBudgets: useQuery({
         queryKey: ["budgets"],
         queryFn: () => getBudgetsFn(),
         onSuccess,
         onError,
         select: ({ data }) => mapBudgetData(data),
         refetchOnMount: false,
         refetchOnWindowFocus: false,
      }),
   };
};
