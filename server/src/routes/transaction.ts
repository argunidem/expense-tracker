import { Router } from "express";
import {
   createTransaction,
   deleteTransaction,
   getTransaction,
   getTransactions,
   updateTransaction,
} from "@/controllers/transaction";
import { protect, validate } from "@/middlewares";
import { refine } from "@/middlewares/refine";
import { paramsSchema } from "@/schemas/params";
import { transactionBodySchema, updateTransactionSchema } from "@/schemas/transaction";

const router = Router();

router
   .route("/")
   .all(protect)
   .get(refine, getTransactions)
   .post(validate(transactionBodySchema), createTransaction);

router
   .route("/:id")
   .all(protect)
   .get(validate(paramsSchema), getTransaction)
   .put(validate(updateTransactionSchema), updateTransaction)
   .delete(validate(paramsSchema), deleteTransaction);

export default router;
