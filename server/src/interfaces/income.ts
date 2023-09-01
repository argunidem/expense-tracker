import { z } from "zod";
import { Document, Types } from "mongoose";
import { incomeSchema } from "@/schemas/income";

//! Income request body with user id
type IncomeInput = z.infer<typeof incomeSchema>["body"] & {
   user: typeof Types.ObjectId;
};

//! Income document
interface IncomeDocument extends Document, IncomeInput {}

export { IncomeInput, IncomeDocument };
