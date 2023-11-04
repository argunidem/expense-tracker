import { z } from "zod";
import { incomeSchema } from "@/schemas/income-schema";

export interface Income extends z.infer<typeof incomeSchema> {
   budgets: string[];
   expiresAt?: string;
   user: string;
   _id: string;
}

export interface IncomeResponse {
   status: boolean;
   data: Income;
}

export interface IncomesResponse {
   status: boolean;
   data: Income[];
}

export interface MappedIncomeData extends Omit<Income, "amount" | "_id"> {
   income: number;
   id: string;
}
