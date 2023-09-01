import { z } from "zod";

const IncomeBodySchema = {
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
};

const params = {
   params: z.object({
      id: z.string(),
   }),
};

const incomeBodySchema = z.object({
   ...IncomeBodySchema,
});

const incomeParamsSchema = z.object({
   ...params,
});

const updateIncomeSchema = z.object({
   ...params,
   body: IncomeBodySchema.body.partial(),
});

export { incomeBodySchema, incomeParamsSchema, updateIncomeSchema };
