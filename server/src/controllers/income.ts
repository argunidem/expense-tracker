import { NextFunction, Request, Response } from "express";
import {
   createNewIncome,
   deleteIncomeById,
   getAndVerifyIncome,
   updateIncomeById,
} from "@/services/income";
import { IncomeInput, IncomeParams, UpdateIncomeInput } from "@/interfaces/income";
import { ApiResponse, IncomeResponse, IncomesResponse } from "@/interfaces/response";

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
      const income = await createNewIncome(req.body);

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

//! Get single income
//! GET /api/incomes/:id
//! Private Route
const getIncome = async (
   req: Request<IncomeParams, IncomeResponse, {}>,
   res: Response<IncomeResponse>,
   next: NextFunction
) => {
   try {
      //- Get income by id and verify if user is owner
      const income = await getAndVerifyIncome(req);
      res.status(200).json({
         status: "success",
         data: income,
      });
   } catch (error: any) {
      next(error);
   }
};

//! Update income
//! PUT /api/incomes/:id
//! Private Route
const updateIncome = async (
   req: Request<IncomeParams, IncomeResponse, UpdateIncomeInput>,
   res: Response<IncomeResponse>,
   next: NextFunction
) => {
   try {
      //- Update income
      const income = await updateIncomeById(req);

      res.status(200).json({
         status: "success",
         data: income,
      });
   } catch (error: any) {
      next(error);
   }
};

//! Delete income
//! DELETE /api/incomes/:id
//! Private Route
const deleteIncome = async (
   req: Request<IncomeParams, ApiResponse, {}>,
   res: Response<ApiResponse>,
   next: NextFunction
) => {
   try {
      //- Delete income
      deleteIncomeById(req);

      res.status(200).json({
         status: "success",
         message: "Income deleted successfully",
      });
   } catch (error: any) {
      next(error);
   }
};

export { createIncome, getIncomes, getIncome, updateIncome, deleteIncome };
