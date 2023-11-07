import { useRouter } from "next/navigation";
import { makeRequest } from "@/utils/request";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import { AuthValues } from "@/schemas/auth-schema";

export const useAuth = () => {
   const { push, refresh } = useRouter();
   const { toast } = useToast();

   const onError = (error: any) => {
      toast({
         description: error.message,
         variant: "destructive",
      });
   };

   const onSuccess = (message: string, route: string = "/") => {
      toast({
         description: message,
      });
      refresh();
      push(route);
   };

   return {
      login: useMutation({
         mutationFn: (values: AuthValues) =>
            makeRequest("/users/login", { method: "POST", values }),
         onSuccess: () => onSuccess("You have successfully logged in"),
         onError,
      }),
      register: useMutation({
         mutationFn: (values: AuthValues) =>
            makeRequest("/users/register", { method: "POST", values }),
         onSuccess: () => onSuccess("You have successfully registered"),
         onError,
      }),
      logout: useQuery({
         queryKey: ["logout"],
         queryFn: () => makeRequest("/users/logout"),
         enabled: false,
         retry: false,
         onSuccess: (data: { status: string; message: string }) =>
            onSuccess(data.message, "/login"),
         onError,
      }),
   };
};
