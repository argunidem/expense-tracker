import { NextFunction, Request, Response } from "express";
import Category from "@/models/category";
import { getAndVerifyCategory } from "@/services/category";
import { NotFoundError } from "@/utils/error";
import { CategoriesResponse, CategoryResponse, MessageResponse } from "@/interfaces/response";
import { CategoryInput, CategoryParams, CategoryWithTransactions } from "@/interfaces/category";

//! Create a new category
//! POST /api/categories
//! Private Route
const createCategory = async (
   req: Request<{}, CategoryResponse, CategoryInput>,
   res: Response<CategoryResponse>,
   next: NextFunction
) => {
   try {
      //- Add user to request body
      req.body.user = req.user?._id;

      const category = await Category.create(req.body);

      res.status(201).json({
         status: "success",
         data: category,
      });
   } catch (error: any) {
      next(error);
   }
};

//! Get all categories
//! GET /api/categories
//! Private Route
const getCategories = async (
   req: Request<{}, CategoriesResponse, {}>,
   res: Response<CategoriesResponse>,
   next: NextFunction
) => {
   try {
      const categories = (await Category.find({ user: req.user?._id }).populate({
         path: "transactions",
         select: "_id type amount date regular",
      })) as CategoryWithTransactions[];

      //- Categorize transactions
      const categorizedData = categories.map((category) => {
         return {
            ...category.toObject(),
            transactions: {
               incomes: category.transactions.filter(
                  (transaction) => transaction.type === "income"
               ),
               expenses: category.transactions.filter(
                  (transaction) => transaction.type === "expense"
               ),
            },
         };
      });

      res.status(200).json({
         status: "success",
         data: categorizedData,
      });
   } catch (error: any) {
      next(error);
   }
};

//! Get a category
//! GET /api/categories/:id
//! Private Route
const getCategory = async (
   req: Request<CategoryParams, CategoryResponse, {}>,
   res: Response<CategoryResponse>,
   next: NextFunction
) => {
   try {
      const category = (await getAndVerifyCategory(
         req.params.id,
         req.user?._id
      )) as CategoryWithTransactions;

      //- Categorize transactions
      const categorizedData = {
         ...category.toObject(),
         transactions: {
            incomes: category.transactions.filter((transaction) => transaction.type === "income"),
            expenses: category.transactions.filter((transaction) => transaction.type === "expense"),
         },
      };

      res.status(200).json({
         status: "success",
         data: categorizedData,
      });
   } catch (error: any) {
      next(error);
   }
};

//! Delete categories
//! DELETE /api/categories
//! Private Route
const deleteCategories = async (
   req: Request<{}, MessageResponse, {}>,
   res: Response<MessageResponse>,
   next: NextFunction
) => {
   try {
      //- Find all categories
      const categories = await Category.find({ user: req.user?._id });

      if (categories.length === 0) {
         return next(new NotFoundError("Categories"));
      }

      //- Delete all categories
      await Category.deleteMany({ user: req.user?._id });

      res.status(200).json({
         status: "success",
         message: "Categories deleted",
      });
   } catch (error: any) {
      next(error);
   }
};

//! Delete a category
//! DELETE /api/categories/:id
//! Private Route
const deleteCategory = async (
   req: Request<CategoryParams, MessageResponse, {}>,
   res: Response<MessageResponse>,
   next: NextFunction
) => {
   try {
      //- Get category and verify if user is owner
      await getAndVerifyCategory(req.params.id, req.user?._id);

      //- Delete category
      await Category.deleteOne({ _id: req.params.id, user: req.user?._id });

      res.status(200).json({
         status: "success",
         message: "Category deleted",
      });
   } catch (error: any) {
      next(error);
   }
};

export { createCategory, getCategories, getCategory, deleteCategories, deleteCategory };
