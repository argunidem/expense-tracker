import { Types } from "mongoose";
import Category from "@/models/category";
import { ForbiddenError, NotFoundError } from "@/utils/error";
import { CategoryWithTransactions } from "@/interfaces/category";

const getAndVerifyCategory = async (
   id: Types.ObjectId | string,
   user: Types.ObjectId
): Promise<CategoryWithTransactions> => {
   try {
      //- Get category by id
      const category = (await Category.findOne({
         _id: id,
         user,
      }).populate({
         path: "transactions",
         select: "_id type amount date regular",
      })) as CategoryWithTransactions;

      //- Check if category exists
      if (!category) {
         throw new NotFoundError("Category");
      }

      //- Check if user is owner of category
      if (category.user.toString() !== user.toString()) {
         throw new ForbiddenError();
      }

      return category;
   } catch (error) {
      throw error;
   }
};

export { getAndVerifyCategory };
