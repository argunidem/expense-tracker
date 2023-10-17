import { Schema, Types, model } from "mongoose";
import {
   BudgetDocument,
   BudgetModel,
   BudgetWithTransactions,
   BudgetQueryHelpers,
} from "@/interfaces/budget";
import { getMonthAndYear } from "@/utils/date";
import { addMonths, getTime } from "date-fns";

const budgetSchema = new Schema<BudgetDocument, BudgetModel, {}, BudgetQueryHelpers>(
   {
      name: {
         type: String,
         required: true,
      },
      summary: {
         totalIncome: {
            type: Number,
            required: true,
            default: 0,
         },
         totalExpense: {
            type: Number,
            required: true,
            default: 0,
         },
         balance: {
            type: Number,
            required: true,
            default: 0,
         },
      },
      month: {
         type: String,
         required: true,
      },
      user: {
         type: Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      timestamp: {
         type: Number,
         default: function () {
            return getTime(new Date(this.month));
         },
      },
   },
   {
      timestamps: true,
      id: false,
      toJSON: {
         virtuals: true,
         transform(_doc, ret) {
            ret.transactions = {
               incomes: ret.incomes,
               expenses: ret.expenses,
            };
            delete ret.incomes;
            delete ret.expenses;
         },
      },
      toObject: { virtuals: true },
   }
);

//! Create virtuals for incomes and expenses
function createBudgetVirtual(name: string, refModel: string) {
   return budgetSchema.virtual(name, {
      ref: refModel,
      localField: "_id",
      foreignField: "budgets",
      justOne: false,
   });
}
createBudgetVirtual("incomes", "Income");
createBudgetVirtual("expenses", "Expense");

//! Query helper function to get budgets by user
budgetSchema.query.byUser = function (userId) {
   return this.where({ user: userId });
};

//! Static method to calculate all budgets of the user
budgetSchema.statics.calculateBudgets = async function (userId: Types.ObjectId) {
   try {
      //- Get all budgets
      const budgets = (await this.find().byUser(userId).populate({
         path: "incomes expenses",
         select: "_id amount -budgets",
      })) as BudgetWithTransactions[];

      //- Calculate budgets
      for (const budget of budgets) {
         const { incomes, expenses } = budget;

         //- Calculate the budget summary
         const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);
         const totalExpense = expenses.reduce((acc, expense) => acc + expense.amount, 0);
         const balance = totalIncome - totalExpense;
         const summary = { totalIncome, totalExpense, balance };

         //- Update budget amount
         await budget.updateOne({ summary });
      }
   } catch (error) {
      console.error("Error in budget static method 'calculateBudgets'".red.underline, error);
   }
};

budgetSchema.statics.createBudgets = async (
   userId: Types.ObjectId,
   startDate: Date,
   endDate: Date = new Date()
) => {
   let budgetIds: Types.ObjectId[] = [];

   //- Create budget entries for the months till the current month
   while (startDate < endDate) {
      //- Create a budget entry for the current month if it doesn't exist
      const budget = await Budget.initializeBudget(userId, startDate);
      //- Add budget._id to budgetIds array
      budgetIds.push(budget._id);
      //- Increment the month
      startDate = addMonths(startDate, 1);
   }
   return budgetIds;
};

//! Create a new budget entry for the month if it doesn't exist
budgetSchema.statics.initializeBudget = async function (
   userId: Types.ObjectId,
   date: Date = new Date()
) {
   try {
      const { name, month } = getMonthAndYear(date);

      //- Check if a budget entry exists for the current month
      const existingBudget = await this.findOne({ month }).byUser(userId);

      if (!existingBudget) {
         //- Create a new budget entry for the current month
         return await this.create({
            name,
            month,
            user: userId,
         });
      }

      return existingBudget;
   } catch (error) {
      console.error("Error in budget static method 'initializeBudget'".red.underline, error);
   }
};

const Budget = model<BudgetDocument, BudgetModel>("Budget", budgetSchema);
export default Budget;
