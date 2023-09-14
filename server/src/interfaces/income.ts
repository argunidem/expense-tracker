import { z } from "zod";
import { Document, Types } from "mongoose";
import { incomeBodySchema } from "@/schemas/income";

//! Income request body with user id
type IncomeInput = z.infer<typeof incomeBodySchema>["body"] & {
   user: Types.ObjectId;
   budgets: Types.ObjectId[];
};

//! Income document
interface IncomeDocument extends Document, IncomeInput {}

export { IncomeInput, IncomeDocument };
