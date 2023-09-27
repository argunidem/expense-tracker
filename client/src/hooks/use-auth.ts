import axios from "@/utils/api";
import { useMutation } from "react-query";
import * as z from "zod";
import { loginSchema, registrationSchema } from "@/schemas/auth-schema";

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

export const useAuth = () => {
   return {
      useLogin: useMutation(login),
      useRegister: useMutation(register),
   };
};
