import { Types } from "mongoose";
import Budget from "@/models/budget";
import Income from "@/models/income";
import Expense from "@/models/expense";
import { getMonthAndYear } from "./date";

export const handleBudgetOnAuth = async (userId: Types.ObjectId, date: Date = new Date()) => {
   try {
      const budgets = await Budget.find().sort("-timestamp");

      //- If butgets.length > 0, that means the user has already logged in before
      if (budgets.length > 0) {
         //- Get the timestamp of the last budget entry and create a date object from it
         const lastBudgetMonth = new Date(budgets[0].timestamp);

         //- Create budget entries for the months till the current month
         const budgetIds = await Budget.createBudgets(userId, lastBudgetMonth, date);

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
