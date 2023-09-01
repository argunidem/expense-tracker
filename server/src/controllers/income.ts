import { NextFunction, Request, Response } from "express";
import { IncomeInput } from "@/interfaces/income";
import { IncomeResponse, IncomesResponse } from "@/interfaces/response";
import { newIncome } from "@/services/income";

//! Create income
//! POST /api/incomes
//! Private Route
const createIncome = async (
   req: Request<{}, IncomeResponse, IncomeInput>,
   res: Response<IncomeResponse>,
   next: NextFunction
) => {
   try {
      //- Add user to request body
      req.body.user = req.user?._id;

      //- Create income
      const income = await newIncome(req.body);

      res.status(201).json({
         status: "success",
         data: income,
      });
   } catch (error: any) {
      next(error);
   }
};

//! Get all incomes
//! GET /api/incomes
//! Private Route
const getIncomes = async (
   _req: Request<{}, IncomesResponse, {}>,
   res: Response<IncomesResponse>,
   next: NextFunction
) => {
   try {
      res.status(200).json(res.results);
   } catch (error: any) {
      next(error);
   }
};

//: TODO - Get single income by id - Check if user owns income

export { createIncome, getIncomes };
