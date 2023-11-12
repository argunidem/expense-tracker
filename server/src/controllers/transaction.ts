import { NextFunction, Request, Response } from "express";
import {
   processTransactionCreation,
   getAndVerifyTransaction,
   updateTransactionById,
   deleteTransactionById,
} from "@/services/transaction";
import {
   TransactionController,
   TransactionInput,
   TransactionParams,
   TransactionUpdateInput,
} from "@/interfaces/transaction";
import { TransactionDocument } from "@/interfaces/transaction";
import { MessageResponse, TransactionResponse, TransactionsResponse } from "@/interfaces/response";

//! Create transaction
//! POST request
//! /api/transactions
//! Private Route
const createTransaction: TransactionController = async (
   req: Request<{}, TransactionResponse, TransactionInput>,
   res,
   next
) => {
   try {
      //- Add user to request body
      req.body.user = req.user?._id;

      //- Create transaction
      const transaction = await processTransactionCreation(req.body);

      res.status(201).json({
         status: "success",
         data: transaction,
      });
   } catch (error: any) {
      next(error);
   }
};

//! Get transactions
//! GET request
//! /api/transactions
//! Private Route
const getTransactions = async (
   _req: Request<{}, TransactionsResponse, {}>,
   res: Response<TransactionsResponse>,
   next: NextFunction
) => {
   try {
      let incomes: TransactionDocument[] = [];
      let expenses: TransactionDocument[] = [];

      res.results?.data.forEach((transaction: TransactionDocument) => {
         transaction.type === "income" ? incomes.push(transaction) : expenses.push(transaction);
      });
      res.status(200).json({
         ...res.results,
         data: {
            incomes,
            expenses,
         },
      });
   } catch (error: any) {
      next(error);
   }
};

//! Get single transaction
//! GET request
//! /api/transactions/:id
//! Private Route
const getTransaction: TransactionController = async (
   req: Request<TransactionParams, TransactionResponse, {}>,
   res,
   next
) => {
   try {
      //- Get transaction by id and verify if user is owner
      const transaction = await getAndVerifyTransaction(req);
      res.status(200).json({
         status: "success",
         data: transaction,
      });
   } catch (error: any) {
      next(error);
   }
};

//! Update transaction
//! PUT request
//! /api/transactions/:id
//! Private Route
const updateTransaction: TransactionController = async (
   req: Request<TransactionParams, TransactionResponse, TransactionUpdateInput>,
   res,
   next
) => {
   try {
      //- Update transaction
      const transaction = await updateTransactionById(req);

      res.status(200).json({
         status: "success",
         data: transaction,
      });
   } catch (error: any) {
      next(error);
   }
};

//! Delete transaction
//! DELETE request
//! /api/transactions/:id
//! Private Route
const deleteTransaction: TransactionController = async (
   req: Request<TransactionParams, MessageResponse, {}>,
   res,
   next
) => {
   try {
      //- Delete transaction
      await deleteTransactionById(req);

      res.status(200).json({
         status: "success",
         message: "Transaction deleted successfully",
      });
   } catch (error: any) {
      next(error);
   }
};

export { createTransaction, getTransactions, getTransaction, updateTransaction, deleteTransaction };
