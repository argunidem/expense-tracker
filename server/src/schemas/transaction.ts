import { z } from "zod";
import { paramsSchema } from "./params";
import { format } from "date-fns";

const transactionBodySchema = z.object({
   body: z.object({
      type: z.enum(["income", "expense"], {
         required_error: "Please provide the type of the transaction.",
      }),
      name: z.string().min(3).max(25).optional(),
      description: z.string().min(5).max(50).optional(),
      category: z
         .string({
            required_error: "Please provide a transaction category.",
         })
         .min(3)
         .max(15),
      amount: z
         .number({
            required_error: "Please provide the amount of the transaction.",
         })
         .min(0.01),
      //- Validate date in MM-dd-yyyy format
      date: z
         .string()
         .regex(/^\d{2}-\d{2}-\d{4}$/)
         .default(format(new Date(), "MM-dd-yyyy")),
      regular: z.boolean().default(false),
      //- Validate date in yyyy-MM format
      expiresAt: z
         .string()
         .regex(/^\d{4}-\d{2}$/)
         .optional(),
   }),
});

const updateTransactionSchema = z.object({
   params: paramsSchema.shape.params,
   body: transactionBodySchema.shape.body.partial(),
});

export { transactionBodySchema, updateTransactionSchema };
