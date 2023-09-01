import { Router } from "express";
import { createIncome, getIncomes } from "@/controllers/income";
import { protect, validate } from "@/middlewares";
import { refine } from "@/middlewares/refine";
import Income from "@/models/income";
import { incomeSchema } from "@/schemas/income";

const router = Router();

router
   .route("/")
   .all(protect)
   .get(refine(Income), getIncomes)
   .post(validate(incomeSchema), createIncome);

//; When refine middleware is created, don't forget to handle populate query

export default router;
