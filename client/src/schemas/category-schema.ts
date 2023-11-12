import { z } from "zod";

export const categorySchema = z.object({
   name: z.string({ required_error: "Please provide a name." }).min(2).max(18),
});
