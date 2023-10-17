import { useRouter } from "next/navigation";
import request from "@/utils/request";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as z from "zod";
import { useToast } from "./use-toast";
import { loginSchema, registrationSchema } from "@/schemas/auth-schema";

type AuthValues = z.infer<typeof loginSchema> | z.infer<typeof registrationSchema>;

export const makeRequest = async <T>(
   path: string,
   values?: AuthValues,
   cookies?: string
): Promise<T> => {
   try {
      const config: AxiosRequestConfig = {
         withCredentials: true,
      };

      if (cookies) {
         config.headers = {
            Cookie: cookies,
         };
      }

      const response: AxiosResponse<T> = values
         ? await request.post(path, values, config)
         : await request.get(path, config);

      return response.data;
   } catch (error: any) {
      if (path.includes("/profile")) {
         return error.response.data;
      }
      throw new Error(error.response?.data.message || "Something went wrong");
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
         mutationFn: (values: AuthValues) => makeRequest("/users/login", values),
         onSuccess: () => onSuccess("You have successfully logged in", "/"),
         onError,
      }),
      register: useMutation({
         mutationFn: (values: AuthValues) => makeRequest("/users/register", values),
         onSuccess: () => onSuccess("You have successfully registered", "/"),
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
