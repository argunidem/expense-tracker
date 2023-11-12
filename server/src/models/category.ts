import { Schema, model } from "mongoose";
import { CategoryDocument } from "@/interfaces/category";

const categorySchema = new Schema<CategoryDocument>({
   name: {
      type: String,
      required: true,
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   transactions: [
      {
         type: Schema.Types.ObjectId,
         ref: "Transaction",
      },
   ],
});

const Category = model<CategoryDocument>("Category", categorySchema);
export default Category;
