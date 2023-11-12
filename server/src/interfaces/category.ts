import { z } from "zod";
import { Document, Types } from "mongoose";
import { categoryBodySchema } from "@/schemas/category";
import { paramsSchema } from "@/schemas/params";

//! Category input
type CategoryInput = z.infer<typeof categoryBodySchema>["body"] & {
   user: Types.ObjectId;
   transactions: Types.ObjectId[];
};

//! Category document
interface CategoryDocument extends Document, CategoryInput {}

interface CategoryWithTransactions extends Omit<CategoryDocument, "transactions"> {
   transactions: {
      _id: Types.ObjectId;
      type: string;
      amount: number;
      date: Date;
      regular: boolean;
   }[];
}

//! Transaction params (/:id)
type CategoryParams = z.infer<typeof paramsSchema>["params"];

export { CategoryInput, CategoryDocument, CategoryWithTransactions, CategoryParams };
