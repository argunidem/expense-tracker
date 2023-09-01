import { z } from "zod";

const incomeSchema = z.object({
   body: z.object({
      source: z
         .string({
            required_error: "Income source is required",
         })
         .min(3)
         .max(50),
      amount: z
         .number({
            required_error: "Income amount is required",
         })
         .min(0.01),
      regular: z.boolean(),
      //- Validate date in YYYY-MM-DD format
      expiresAt: z
         .string()
         .regex(/^\d{4}-\d{2}-\d{2}$/)
         .optional(),
   }),
});

export { incomeSchema };
