import axios from "@/utils/api";
import { useMutation, useQuery } from "react-query";
import { useToast } from "./use-toast";
import { useRouter } from "next/navigation";

const getExpensesFn = async (values: any) => {
   try {
      const { data } = await axios.get("/expenses", values);
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
         queryKey: "expenses",
         queryFn: getExpensesFn,
         onSuccess: () => onSuccess(),
         onError,
         refetchOnWindowFocus: false,
      }),
      // useRegister: useMutation({
      //    mutationFn: register,
      //    onSuccess: () => onSuccess("You have successfully registered", "/"),
      //    onError,
      // }),
      // useLogout: useQuery({
      //    queryKey: "logout",
      //    queryFn: logout,
      //    enabled: false,
      //    retry: false,
      //    onSuccess: (data) => onSuccess(data.message, "/login"),
      //    onError,
      // }),
   };
};
