import { z } from "zod";
import { Document, Types } from "mongoose";
import { expenseBodySchema } from "@/schemas/expense";

//! Expense request body with user id
type ExpenseInput = z.infer<typeof expenseBodySchema>["body"] & {
   user: typeof Types.ObjectId;
};

//! Expense document
interface ExpenseDocument extends Document, ExpenseInput {}

export { ExpenseInput, ExpenseDocument };
