import { Schema, Types, model } from "mongoose";
import { IncomeDocument } from "@/interfaces/income";
import { setDateNow } from "@/utils/date";

const incomeSchema: Schema = new Schema<IncomeDocument>(
   {
      name: {
         type: String,
      },
      description: {
         type: String,
      },
      source: {
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

const Income = model<IncomeDocument>("Income", incomeSchema);
export default Income;
