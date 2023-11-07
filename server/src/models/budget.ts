import { Schema, Types, model } from "mongoose";
import {
   BudgetDocument,
   BudgetModel,
   BudgetWithTransactions,
   BudgetQueryHelpers,
   TransactionVirtual,
} from "@/interfaces/budget";
import { TransactionDocument } from "@/interfaces/transaction";
import { addMonths, getTime } from "date-fns";
import { getMonthAndYear } from "@/utils/date";

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
            let incomes: TransactionVirtual = [];
            let expenses: TransactionVirtual = [];
            ret.transactions.forEach((transaction: TransactionDocument) => {
               const result = {
                  _id: transaction._id,
                  amount: transaction.amount,
                  date: transaction.date,
               };
               transaction.type === "income" ? incomes.push(result) : expenses.push(result);
            });

            ret.transactions = {
               incomes,
               expenses,
            };
         },
      },
      toObject: { virtuals: true },
   }
);

//! Create virtuals for transactions
budgetSchema.virtual("transactions", {
   ref: "Transaction",
   localField: "_id",
   foreignField: "budgets",
   justOne: false,
});

//! Query helper function to get budgets by user
budgetSchema.query.byUser = function (userId) {
   return this.where({ user: userId });
};

//! Static method to calculate all budgets of the user
budgetSchema.statics.calculateBudgets = async function (userId: Types.ObjectId) {
   try {
      //- Get all budgets of the user with transactions populated
      const budgets = (await this.find().byUser(userId).populate({
         path: "transactions",
         select: "type amount",
      })) as BudgetWithTransactions[];

      //- Calculate budgets
      for (const budget of budgets) {
         const { transactions } = budget;

         //- Calculate the budget summary
         const totalIncome = transactions.reduce(
            (acc, transaction) => (transaction.type === "income" ? acc + transaction.amount : acc),
            0
         );
         const totalExpense = transactions.reduce(
            (acc, transaction) => (transaction.type === "expense" ? acc + transaction.amount : acc),
            0
         );
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
