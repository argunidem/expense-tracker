import { Schema, Types, model } from "mongoose";
import { BudgetDocument } from "@/interfaces/budget";

const budgetSchema: Schema = new Schema(
   {
      name: {
         type: String,
         required: true,
      },
      amount: {
         type: Number,
         required: true,
         default: 0,
      },
      month: {
         type: String,
         required: true,
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

const Budget = model<BudgetDocument>("Budget", budgetSchema);
export default Budget;
