import { Schema, Types, model } from "mongoose";
import { ExpenseDocument } from "@/interfaces/expense";
import { setDateNow } from "@/utils/date";

const expenseSchema: Schema = new Schema<ExpenseDocument>(
   {
      name: {
         type: String,
      },
      description: {
         type: String,
      },
      category: {
         type: String,
         required: true,
      },
      amount: {
         type: Number,
         required: true,
      },
      date: {
         type: String,
         default: setDateNow(),
      },
      regular: {
         type: Boolean,
      },
      expiresAt: {
         type: String,
      },
      user: {
         type: Types.ObjectId,
         ref: "User",
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

const Expense = model<ExpenseDocument>("Expense", expenseSchema);
export default Expense;
