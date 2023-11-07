import { z } from "zod";
import { NextFunction, Request, Response } from "express";
import { Document, Types } from "mongoose";
import { MessageResponse, TransactionResponse } from "./response";
import { paramsSchema } from "@/schemas/params";

import { transactionBodySchema } from "@/schemas/transaction";

//! Transaction input (income or expense)
type TransactionInput = z.infer<typeof transactionBodySchema>["body"] & {
   user: Types.ObjectId;
   budgets: Types.ObjectId[];
};

//! Transaction document (income or expense)
interface TransactionDocument extends Document, TransactionInput {}

//! Update transaction input (income or expense)
type TransactionUpdateInput = Partial<TransactionInput>;

//! Transaction params (/:id)
type TransactionParams = z.infer<typeof paramsSchema>["params"];

//! Transaction controller (create, get, update, delete)
type TransactionController = (
   req: Request<any, TransactionResponse | MessageResponse, any>,
   res: Response<TransactionResponse | MessageResponse>,
   next: NextFunction
) => Promise<void>;

export {
   TransactionInput,
   TransactionUpdateInput,
   TransactionParams,
   TransactionDocument,
   TransactionController,
};
