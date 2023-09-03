import { z } from "zod";
import { paramsSchema } from "./params";

const incomeBodySchema = z.object({
   body: z.object({
      name: z.string().min(3).max(25).optional(),
      description: z.string().min(5).max(50).optional(),
      source: z
         .string({
            required_error: "Please provide an income source.",
         })
         .min(3)
         .max(15),
      amount: z
         .number({
            required_error: "Please provide the amount of the income.",
         })
         .min(0.01),
      //; TODO - Later on change date to be z.date() type and convert to correct format in the backend
      //- Validate date in YYYY-MM-DD format
      date: z
         .string()
         .regex(/^\d{4}-\d{2}-\d{2}$/)
         .optional(),
      regular: z.boolean().default(false),
      //- Validate date in YYYY-MM-DD format
      expiresAt: z
         .string()
         .regex(/^\d{4}-\d{2}-\d{2}$/)
         .optional(),
   }),
});

const updateIncomeSchema = z.object({
   params: paramsSchema.shape.params,
   body: incomeBodySchema.shape.body.partial(),
});

export { incomeBodySchema, updateIncomeSchema };
