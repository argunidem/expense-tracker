import { Schema, Types, model } from "mongoose";
import { ExpenseDocument } from "@/interfaces/expense";

const expenseSchema: Schema = new Schema(
   {
      name: {
         type: String,
         required: true,
      },
      amount: {
         type: Number,
         required: true,
      },
      category: {
         type: String,
         required: true,
      },
      date: {
         type: Date,
      },
      regular: {
         type: Boolean,
         default: false,
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
