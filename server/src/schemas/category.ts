import { z } from "zod";

export const categoryBodySchema = z.object({
   body: z.object({
      name: z.string({ required_error: "Please provide a name." }).min(2).max(18),
   }),
});
