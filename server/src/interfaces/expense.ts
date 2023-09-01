import { Document, Types } from "mongoose";

interface ExpenseDocument extends Document {
   name: string;
   amount: number;
   category: string;
   date: Date;
   user: Types.ObjectId;
}

export { ExpenseDocument };
