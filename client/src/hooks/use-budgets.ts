import axios from "@/utils/api";
import { useQuery } from "react-query";
import { useToast } from "./use-toast";
import { useRouter } from "next/navigation";

const getBudgetsFn = async (values: any) => {
   try {
      const { data } = await axios.get("/budgets", values);
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
         queryKey: "budgets",
         queryFn: getBudgetsFn,
         onSuccess: () => onSuccess(),
         onError,
         refetchOnWindowFocus: false,
      }),
   };
};
