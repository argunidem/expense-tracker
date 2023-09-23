import { Schema, model } from "mongoose";
import { ExpenseDocument } from "@/interfaces/expense";
import { format } from "date-fns";
import { preSaveBudgetProcessing } from "@/utils/budget";

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
expenseSchema.pre("save", async function () {
   await preSaveBudgetProcessing(this);
});

//! Calculate all budgets of the user after a CRUD operation
expenseSchema.post(
   ["deleteOne", "save", "findOne"],
   { document: true, query: false },
   async function () {
      try {
         await this.model("Budget").calculateBudgets(this.user);
      } catch (error) {
         console.error("Error in expense post-save middleware: ".red.underline, error);
      }
   }
);

const Expense = model<ExpenseDocument>("Expense", expenseSchema);
export default Expense;
