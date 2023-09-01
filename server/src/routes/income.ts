import { Router } from "express";
import {
   createIncome,
   deleteIncome,
   getIncome,
   getIncomes,
   updateIncome,
} from "@/controllers/income";
import Income from "@/models/income";
import { protect, validate } from "@/middlewares";
import { refine } from "@/middlewares/refine";
import { incomeBodySchema, incomeParamsSchema, updateIncomeSchema } from "@/schemas/income";

const router = Router();

router
   .route("/")
   .all(protect)
   .get(refine(Income), getIncomes)
   .post(validate(incomeBodySchema), createIncome);

router
   .route("/:id")
   .all(protect)
   .get(validate(incomeParamsSchema), getIncome)
   .put(validate(updateIncomeSchema), updateIncome)
   .delete(validate(incomeParamsSchema), deleteIncome);

export default router;
