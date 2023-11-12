import { Schema, Types, model } from "mongoose";
import { TransactionDocument } from "@/interfaces/transaction";
import { format } from "date-fns";
import { getEndOfMonth } from "@/utils/date";
import { getAndVerifyCategory } from "@/services/category";

const transactionSchema: Schema = new Schema<TransactionDocument>(
   {
      type: {
         type: String,
         enum: ["income", "expense"],
         required: true,
      },
      name: {
         type: String,
      },
      description: {
         type: String,
      },
      category: {
         type: Schema.Types.ObjectId,
         ref: "Category",
         required: true,
      },
      amount: {
         type: Number,
         required: true,
      },
      date: {
         type: String,
         required: true,
         default: format(new Date(), "MM-dd-yyyy"),
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
transactionSchema.pre("save", async function () {
   try {
      const { date, user, regular } = this;
      //- If the transaction is regular, needs to be added to all budgets since the date of the transaction till the current month or the expiration date
      if (regular) {
         //- Get the date of the 15th of the month
         const transactionDate = new Date(`${date.slice(0, 2)}-15-${date.slice(6)}`);

         let timestamp;
         if (this.expiresAt) {
            if (getEndOfMonth() > getEndOfMonth(new Date(this.expiresAt))) {
               //- Get the timestamp of the last day of the date's month
               const endOfTransactionMonth = getEndOfMonth(new Date(date));
               //- Get the timestamp of the last day of the expiration date's month
               const endOfExpirationMonth = getEndOfMonth(new Date(this.expiresAt));
               //- Get the maximum of the two timestamps
               timestamp = Math.max(endOfExpirationMonth, endOfTransactionMonth);
            } else {
               //- If the expiration date is in the future, set the timestamp to the last day of the current month
               timestamp = getEndOfMonth();
            }
         } else {
            //- Get the timestamp of the last day of the current month
            const endOfThisMonth = getEndOfMonth();
            //- If no expiration date, set the timestamp to the last day of the current month
            timestamp = endOfThisMonth;
         }
         //- Create a date object from the timestamp
         const until = new Date(timestamp);

         const budgetIds = await this.model("Budget").createBudgets(user, transactionDate, until);
         this.budgets = budgetIds;
      } else {
         const budget = await this.model("Budget").initializeBudget(user, new Date(date));
         this.budgets = [budget._id];
      }
   } catch (error) {
      console.error("Error in transaction pre-save middleware: ".red.underline, error);
   }
});

//! Remove transaction from its category
transactionSchema.pre("deleteOne", { document: true, query: false }, async function () {
   try {
      //- Get category by id and verify if user is owner
      const category = await getAndVerifyCategory(this.category, this.user);
      //- Remove transaction from category
      category.transactions = category.transactions.filter(
         (id) => id.toString() !== (this._id as unknown as Types.ObjectId).toString()
      );

      await category.save();
   } catch (error) {
      console.error("Error in transaction pre-deleteOne middleware: ".red.underline, error);
   }
});

//! Calculate all budgets of the user after a CRUD operation
transactionSchema.post(
   ["deleteOne", "save", "findOne"],
   { document: true, query: false },
   async function () {
      try {
         await this.model("Budget").calculateBudgets(this.user);
      } catch (error) {
         console.error("Error in transaction post-save middleware: ".red.underline, error);
      }
   }
);

const Transaction = model<TransactionDocument>("Transaction", transactionSchema);
export default Transaction;
