import { Router } from "express";
import { Model } from "mongoose";
import {
   create,
   deleteResource,
   getResource,
   getResources,
   updateResource,
} from "@/controllers/resource";
import { protect, validate, refine } from "@/middlewares";
import Income from "@/models/income";
import Expense from "@/models/expense";
import { paramsSchema } from "@/schemas/params";
import { incomeBodySchema, updateIncomeSchema } from "@/schemas/income";
import { expenseBodySchema, updateExpenseSchema } from "@/schemas/expense";
import { ResourceDocument } from "@/interfaces/resource";

const createRoutes = <T extends ResourceDocument>(
   model: Model<T>,
   schemas: {
      body: typeof incomeBodySchema | typeof expenseBodySchema;
      params: typeof paramsSchema;
      update: typeof updateIncomeSchema | typeof updateExpenseSchema;
   }
) => {
   const { body, params, update } = schemas;
   const router = Router();

   router
      .route(`/`)
      .all(protect)
      .get(refine(model), getResources)
      .post(validate(body), create(model));

   router
      .route(`/:id`)
      .all(protect)
      .get(validate(params), getResource(model))
      .put(validate(update), updateResource(model))
      .delete(validate(params), deleteResource(model));

   return router;
};

export const income = createRoutes(Income, {
   body: incomeBodySchema,
   params: paramsSchema,
   update: updateIncomeSchema,
});
export const expense = createRoutes(Expense, {
   body: expenseBodySchema,
   params: paramsSchema,
   update: updateExpenseSchema,
});
