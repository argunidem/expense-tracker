import { z } from "zod";

const paramsSchema = z.object({
   params: z.object({
      id: z.string(),
   }),
});

export { paramsSchema };
