import { z } from "zod";
import { Document, Types } from "mongoose";
import { incomeBodySchema, incomeParamsSchema, updateIncomeSchema } from "@/schemas/income";

//! Income request body with user id
type IncomeInput = z.infer<typeof incomeBodySchema>["body"] & {
   user: typeof Types.ObjectId;
};

//! Income request params
type IncomeParams = z.infer<typeof incomeParamsSchema>["params"];

//! Update income request body (optional fields)
type UpdateIncomeInput = z.infer<typeof updateIncomeSchema>["body"] & {
   user: typeof Types.ObjectId;
};

//! Income document
interface IncomeDocument extends Document, IncomeInput {}

export { IncomeInput, IncomeDocument, IncomeParams, UpdateIncomeInput };
