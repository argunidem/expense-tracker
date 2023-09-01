import { z } from "zod";

const expenseSchema = z.object({
   body: z.object({
      name: z.string().min(3).max(50),
      amount: z.number().min(0.01),
      category: z.string().min(3).max(30),
      //- Validate date in YYYY-MM-DD format
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      regular: z.boolean(),
   }),
});

export { expenseSchema };
