import { Document } from "mongoose";
import Budget from "@/models/budget";
import { getEndOfMonth } from "./date";

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

export { preSaveBudgetProcessing };
