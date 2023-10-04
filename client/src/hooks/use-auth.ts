import axios from "@/utils/api";
import { useMutation, useQuery } from "react-query";
import * as z from "zod";
import { loginSchema, registrationSchema } from "@/schemas/auth-schema";
import { useToast } from "./use-toast";
import { useRouter } from "next/navigation";

type AuthValues = z.infer<typeof loginSchema> | z.infer<typeof registrationSchema>;

const login = async (values: AuthValues) => {
   try {
      return await axios.post("/users/login", values);
   } catch (error: any) {
      throw new Error(error.response.data.message || "Something went wrong");
   }
};

const register = async (values: AuthValues) => {
   try {
      return await axios.post("/users/register", values);
   } catch (error: any) {
      throw new Error(error.response.data.message || "Something went wrong");
   }
};

const logout = async () => {
   try {
      const { data } = await axios.get("/users/logout");
      return data;
   } catch (error: any) {
      throw new Error(error.response.data.message || "Something went wrong");
   }
};

export const useAuth = () => {
   const { push } = useRouter();
   const { toast } = useToast();

   const onError = (error: any) => {
      toast({
         description: error.message,
         variant: "destructive",
      });
   };

   const onSuccess = (message: string, redirect: string) => {
      toast({
         description: message,
      });
      push(redirect);
   };

   return {
      useLogin: useMutation({
         mutationFn: login,
         onSuccess: () => onSuccess("You have successfully logged in", "/dashboard"),
         onError,
      }),
      useRegister: useMutation({
         mutationFn: register,
         onSuccess: () => onSuccess("You have successfully registered", "/dashboard"),
         onError,
      }),
      useLogout: useQuery({
         queryKey: "logout",
         queryFn: logout,
         enabled: false,
         retry: false,
         onSuccess: (data) => onSuccess(data.message, "/login"),
         onError,
      }),
   };
};
