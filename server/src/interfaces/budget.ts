import { Model, Query, Document, Types } from "mongoose";
import { ResourceDocument } from "./resource";

//! Budget document
interface BudgetDocument extends Document {
   name: string;
   summary: {
      totalIncome: number;
      totalExpense: number;
      balance: number;
   };
   month: string;
   timestamp: number;
   user: Types.ObjectId;
}

interface BudgetQueryHelpers extends Query<any, BudgetDocument> {
   byUser(userId: Types.ObjectId): BudgetQueryHelpers;
}

type ResourceSubset = Pick<ResourceDocument, "_id" | "amount">;

interface BudgetWithTransactions extends BudgetDocument {
   incomes: ResourceSubset[];
   expenses: ResourceSubset[];
}

//! Budget model
interface BudgetModel extends Model<BudgetDocument, BudgetQueryHelpers> {
   calculateBudgets(userId: Types.ObjectId): Promise<void>;
   initializeBudget(userId: Types.ObjectId, date?: Date): Promise<BudgetDocument>;
   createBudgets(
      userId: Types.ObjectId,
      startDate: Date,
      endDate?: Date
   ): Promise<Types.ObjectId[]>;
}

export { BudgetDocument, BudgetModel, BudgetWithTransactions, BudgetQueryHelpers };
