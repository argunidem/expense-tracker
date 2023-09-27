import axios from "axios";
import { useMutation } from "react-query";

const login = async (values: any) => {
   try {
      return await axios.post("/users/login", values);
   } catch (error: any) {
      throw new Error(error.response.data.message || "Something went wrong");
   }
};

export const useLoginUser = () => {
   return useMutation(login);
};

const register = async (values: any) => {
   try {
      return await axios.post("/users/register", values);
   } catch (error: any) {
      throw new Error(error.response.data.message || "Something went wrong");
   }
};

export const useRegisterUser = () => {
   return useMutation(register);
};
