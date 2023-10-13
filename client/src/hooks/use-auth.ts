import axios from "@/utils/api";
import { useMutation, useQuery } from "react-query";
import * as z from "zod";
import { loginSchema, registrationSchema } from "@/schemas/auth-schema";
import { useToast } from "./use-toast";
import { useRouter } from "next/navigation";

type AuthValues = z.infer<typeof loginSchema> | z.infer<typeof registrationSchema>;

const loginFn = async (values: AuthValues) => {
   try {
      return await axios.post("/users/login", values);
   } catch (error: any) {
      throw new Error(error.response.data.message || "Something went wrong");
   }
};

const registerFn = async (values: AuthValues) => {
   try {
      return await axios.post("/users/register", values);
   } catch (error: any) {
      throw new Error(error.response.data.message || "Something went wrong");
   }
};

const logoutFn = async () => {
   try {
      const { data } = await axios.get("/users/logout");
      return data;
   } catch (error: any) {
      throw new Error(error.response.data.message || "Something went wrong");
   }
};

export const useAuth = () => {
   const { push, refresh } = useRouter();
   const { toast } = useToast();

   const onError = (error: any) => {
      toast({
         description: error.message,
         variant: "destructive",
      });
   };

   const onSuccess = (message: string, route: string) => {
      toast({
         description: message,
      });
      refresh();
      push(route);
   };

   return {
      login: useMutation({
         mutationFn: loginFn,
         onSuccess: () => onSuccess("You have successfully logged in", "/"),
         onError,
      }),
      register: useMutation({
         mutationFn: registerFn,
         onSuccess: () => onSuccess("You have successfully registered", "/"),
         onError,
      }),
      logout: useQuery({
         queryKey: "logout",
         queryFn: logoutFn,
         enabled: false,
         retry: false,
         onSuccess: (data) => onSuccess(data.message, "/login"),
         onError,
      }),
   };
};
