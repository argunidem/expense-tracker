import { Document, Types } from "mongoose";
import Budget from "@/models/budget";
import Income from "@/models/income";
import Expense from "@/models/expense";
import { getMonthAndYear, getEndOfMonth } from "./date";

const handleBudgetOnAuth = async (userId: Types.ObjectId, date: Date = new Date()) => {
   try {
      const budgets = await Budget.find().sort("-timestamp");

      //- If butgets.length > 0, that means the user has already logged in before
      if (budgets.length > 0) {
         //- Get the timestamp of the last budget entry and create a date object from it
         const lastBudgetMonth = new Date(budgets[0].timestamp);

         //- Create budget entries for the months till the current month
         const budgetIds = await Budget.createBudgets(userId, lastBudgetMonth, date);

         //- Query for all regular incomes and expenses of the user
         const query = {
            user: userId,
            regular: true,
            $or: [
               { expiresAt: { $exists: false } },
               {
                  $expr: {
                     $eq: [{ $toLong: { $toDate: "$expiresAt" } }, budgets[0].timestamp],
                  },
               },
            ],
         };
         const update = { $addToSet: { budgets: { $each: budgetIds } } };

         //- Add the budgetIds to the budgets array of all regular incomes and expenses of the user
         await Income.updateMany(query, update);
         await Expense.updateMany(query, update);

         //- Calculate all budgets of the user after income and expense updates on login
         await Budget.calculateBudgets(userId);
      } else {
         //- Else means the user is logging in for the first time
         const { name, month } = getMonthAndYear(date);
         await Budget.create({
            name,
            month,
            user: userId,
         });
      }
   } catch (error) {
      console.error(error);
   }
};

const preSaveBudgetProcessing = async function (
   doc: Document<unknown, {}, { [x: string]: any }> & { [x: string]: any } & Required<{
         _id: unknown;
      }>
) {
   try {
      const { date, user, regular } = doc;

      //- If the transaction is regular, needs to be added to all budgets since the date of the transaction till the current month or the expiration date
      if (regular) {
         //- Get the date of the 15th of the month
         const transactionDate = new Date(`${date.slice(0, 7)}-15`);

         let timestamp;
         if (doc.expiresAt) {
            //- Get the timestamp of the last day of the date's month
            const endOfTransactionMonth = getEndOfMonth(new Date(date));
            //- Get the timestamp of the last day of the expiration date's month
            const endOfExpirationMonth = getEndOfMonth(new Date(doc.expiresAt));
            //- Get the maximum of the two timestamps
            timestamp = Math.max(endOfExpirationMonth, endOfTransactionMonth);
         } else {
            //- Get the timestamp of the last day of the current month
            const endOfThisMonth = getEndOfMonth();
            //- If no expiration date, set the timestamp to the last day of the current month
            timestamp = endOfThisMonth;
         }
         //- Create a date object from the timestamp
         const until = new Date(timestamp);

         const budgetIds = await Budget.createBudgets(user, transactionDate, until);
         doc.budgets = budgetIds;
      } else {
         const budget = await Budget.initializeBudget(user, new Date(date));
         doc.budgets = [budget._id];
      }
   } catch (error) {
      console.error("Error in transaction pre-save middleware: ".red.underline, error);
   }
};

export { handleBudgetOnAuth, preSaveBudgetProcessing };
