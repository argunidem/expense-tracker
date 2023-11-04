import { z } from "zod";
import { format } from "date-fns";

const incomeSchema = z.object({
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
   date: z.date().transform((date) => format(date, "yyyy-MM-dd")),
   regular: z.boolean().default(false).optional(),
   expiresAt: z
      .date()
      .transform((date) => format(date, "yyyy-MM"))
      .optional(),
});

export { incomeSchema };
