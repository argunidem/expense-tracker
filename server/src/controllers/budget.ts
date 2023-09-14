import { NextFunction, Request, Response } from "express";
import Budget from "@/models/budget";
import { Types } from "mongoose";

const getBudget = async (req: Request, res: Response, next: NextFunction) => {
   try {
      //- Get all budgets with their transactions
      const budget = await Budget.findById(req.params.id)
         .byUser(req.session.user as Types.ObjectId)
         .populate({
            path: "incomes expenses",
            select: "_id amount date -budgets",
         });

      res.status(200).json({
         status: "success",
         data: budget,
      });
   } catch (error: any) {
      next(error);
   }
};

const getBudgets = async (req: Request, res: Response, next: NextFunction) => {
   try {
      //- Get all budgets with their transactions
      const budgets = await Budget.find()
         .byUser(req.session.user as Types.ObjectId)
         .populate({
            path: "incomes expenses",
            select: "_id amount date -budgets",
         });

      res.status(200).json({
         status: "success",
         data: budgets,
      });
   } catch (error: any) {
      next(error);
   }
};

export { getBudget, getBudgets };
