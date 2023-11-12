import { z } from "zod";
import { categorySchema } from "@/schemas/category-schema";

export type CategoryValues = z.infer<typeof categorySchema>;

export interface Category extends CategoryValues {
   name: string;
   transactions: {
      incomes: {
         amount: number;
         date: string;
         regular: boolean;
         type: string;
         _id: string;
      }[];
      expenses: {
         amount: number;
         date: string;
         regular: boolean;
         type: string;
         _id: string;
      }[];
   };
   _id: string;
   user: string;
}

export interface CategoryResponse {
   status: string;
   data: Category;
}

export interface CategoriesResponse {
   status: string;
   data: Category[];
}
