import { Request } from "express";
import { Document } from "mongoose";
import Transaction from "@/models/transaction";
import { ForbiddenError, NotFoundError } from "@/utils/error";
import {
   TransactionDocument,
   TransactionInput,
   TransactionParams,
   TransactionUpdateInput,
} from "@/interfaces/transaction";
import { MessageResponse, TransactionResponse } from "@/interfaces/response";

const processTransactionCreation = async (body: TransactionInput) => {
   const transaction = new Transaction(body);
   return await transaction.save();
};

const getAndVerifyTransaction = async (
   req: Request<TransactionParams, any, TransactionInput | TransactionUpdateInput>
): Promise<TransactionDocument> => {
   try {
      //- Get transaction by id
      const transaction = await Transaction.findOne({ _id: req.params.id });

      //- Check if transaction exists
      if (!transaction) {
         throw new NotFoundError("Transaction");
      }

      //- Check if user is owner of transaction
      if (transaction.user.toString() !== req.user?._id.toString()) {
         throw new ForbiddenError();
      }

      //- If query has populate, populate the transaction with the user
      if (req.query.populate) {
         await (transaction as Document).populate(req.query.populate as string);
      }

      return transaction;
   } catch (error) {
      throw error;
   }
};

const updateTransactionById = async (
   req: Request<TransactionParams, TransactionResponse, TransactionUpdateInput>
): Promise<TransactionDocument> => {
   try {
      const { body } = req;
      //- Check if transaction exists and user is owner
      const transaction = await getAndVerifyTransaction(req);

      //- Update transaction
      transaction.set(body);

      //- Trigger the post save middleware to update the budget
      await transaction.save();

      return transaction as TransactionDocument;
   } catch (error) {
      throw error;
   }
};

const deleteTransactionById = async (
   req: Request<TransactionParams, MessageResponse, {}>
): Promise<void> => {
   try {
      //- Check if transaction exists and user is owner
      const transaction = await getAndVerifyTransaction(req);

      //- Delete transaction
      await transaction.deleteOne();
   } catch (error) {
      throw error;
   }
};

export {
   processTransactionCreation,
   getAndVerifyTransaction,
   updateTransactionById,
   deleteTransactionById,
};
