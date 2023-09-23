import { Schema, model } from "mongoose";
import { IncomeDocument } from "@/interfaces/income";
import { format } from "date-fns";
import { preSaveBudgetProcessing } from "@/utils/budget";

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
         required: true,
         default: format(new Date(), "yyyy-MM-dd"),
      },
      regular: {
         type: Boolean,
         required: true,
         default: false,
      },
      budgets: [
         {
            type: Schema.Types.ObjectId,
            ref: "Budget",
         },
      ],
      expiresAt: {
         type: String,
      },
      user: {
         type: Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

//! Handle budgets array before saving
incomeSchema.pre("save", async function () {
   await preSaveBudgetProcessing(this);
});

//! Calculate all budgets of the user after a CRUD operation
incomeSchema.post(
   ["deleteOne", "save", "findOne"],
   { document: true, query: false },
   async function () {
      try {
         await this.model("Budget").calculateBudgets(this.user);
      } catch (error) {
         console.error("Error in income post-save middleware: ".red.underline, error);
      }
   }
);

const Income = model<IncomeDocument>("Income", incomeSchema);
export default Income;
