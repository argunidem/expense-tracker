import { z } from "zod";
import { paramsSchema } from "./params";

const expenseBodySchema = z.object({
   body: z.object({
      name: z.string().min(3).max(25).optional(),
      description: z.string().min(5).max(50).optional(),
      category: z
         .string({
            required_error: "Please provide an expense category.",
         })
         .min(3)
         .max(30),
      amount: z
         .number({
            required_error: "Please provide the amount of the expense.",
         })
         .min(0.01),
      //- Validate date in YYYY-MM-DD format
      date: z
         .string()
         .regex(/^\d{4}-\d{2}-\d{2}$/)
         .optional(),
      regular: z.boolean().default(false),
      expiresAt: z
         .string()
         .regex(/^\d{4}-\d{2}-\d{2}$/)
         .optional(),
   }),
});

const updateExpenseSchema = z.object({
   params: paramsSchema.shape.params,
   body: expenseBodySchema.shape.body.partial(),
});

export { expenseBodySchema, updateExpenseSchema };
