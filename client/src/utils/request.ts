import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { AuthValues } from "@/schemas/auth-schema";
import { TransactionValues } from "@/interfaces/transaction";

const request = axios.create({
   baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type RequestOptions = {
   method?: HttpMethod;
   values?: AuthValues | TransactionValues;
   params?: Record<string, any>;
   cookies?: string;
};

const makeRequest = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
   const { method = "GET", values, params, cookies } = options;
   try {
      const config: AxiosRequestConfig = {
         method,
         url: path,
         params,
         ...(method === "POST" || method === "PUT" ? { data: values } : {}),
         headers: cookies ? { Cookie: cookies } : undefined,
         withCredentials: true,
      };

      const { data }: AxiosResponse<T> = await request(config);

      return data;
   } catch (error: any) {
      if (path.includes("/profile")) {
         return error.response.data;
      }
      throw new Error(error.response?.data.message || "Something went wrong");
   }
};

export { request, makeRequest };
