import { z } from "zod";

const budgetSchema = z.object({
   body: z.object({
      name: z.string().min(3).max(50),
      amount: z.number().min(0.01),
      //- Validate month in YYYY-MM format
      month: z.string().regex(/^\d{4}-\d{2}$/),
   }),
});

export { budgetSchema };
