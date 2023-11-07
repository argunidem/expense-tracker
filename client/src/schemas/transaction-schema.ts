import { z } from "zod";
import { format } from "date-fns";

const transactionSchema = z.object({
   type: z.enum(["income", "expense"], {
      required_error: "Please provide the type of the transaction.",
   }),
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
   date: z.date().transform((date) => format(date, "MM-dd-yyyy")),
   regular: z.boolean().default(false).optional(),
   expiresAt: z
      .date()
      .transform((date) => format(date, "yyyy-MM"))
      .optional(),
});

export { transactionSchema };
