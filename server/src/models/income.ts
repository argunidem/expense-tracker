import { Schema, Types, model } from "mongoose";
import { IncomeDocument } from "@/interfaces/income";

const incomeSchema: Schema = new Schema<IncomeDocument>(
   {
      source: {
         type: String,
         required: true,
      },
      amount: {
         type: Number,
         required: true,
      },
      regular: {
         type: Boolean,
         default: false,
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

const Income = model<IncomeDocument>("Income", incomeSchema);
export default Income;