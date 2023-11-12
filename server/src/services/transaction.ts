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
import { getAndVerifyCategory } from "./category";

const processTransactionCreation = async (body: TransactionInput) => {
   const transaction = new Transaction(body);

   //- Get category and verify if user is owner
   const category = await getAndVerifyCategory(body.category, body.user);

   //- Add transaction to category
   category.transactions.push(transaction._id);
   await category.save();

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

      //- If category is being updated
      if (body.category) {
         //- Get category and verify if user is owner
         const category = await getAndVerifyCategory(body.category, transaction.user);

         //- Remove transaction from old category
         const oldCategory = await getAndVerifyCategory(transaction.category, transaction.user);
         oldCategory.transactions = oldCategory.transactions.filter(
            (transaction) => transaction._id.toString() !== transaction._id.toString()
         );
         await oldCategory.save();

         //- Add transaction to new category
         category.transactions.push(transaction._id);
         await category.save();
      }

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
