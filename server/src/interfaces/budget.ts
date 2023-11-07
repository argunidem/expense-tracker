import { Model, Query, Document, Types } from "mongoose";
import { TransactionDocument } from "./transaction";

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

type TransactionVirtual = Pick<TransactionDocument, "_id" | "amount" | "date">[];

interface BudgetWithTransactions extends BudgetDocument {
   transactions: Pick<TransactionDocument, "type" | "amount">[];
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

export {
   BudgetDocument,
   BudgetModel,
   BudgetWithTransactions,
   TransactionVirtual,
   BudgetQueryHelpers,
};
