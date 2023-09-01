import { Document, Types } from "mongoose";

interface BudgetDocument extends Document {
   name: string;
   totalAmount: number;
   timePeriod: string;
   user: Types.ObjectId;
}

export { BudgetDocument };
