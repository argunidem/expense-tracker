import { z } from "zod";

const bodySchema = z.object({
   email: z
      .string({
         required_error: "Email address is required.",
      })
      .email("The email provided is invalid."),
   password: z
      .string({
         required_error: "Password is required.",
      })
      .min(6, "Password must have at least 6 characters."),
});

const loginSchema = z.object({
   body: bodySchema,
});

const registrationSchema = z.object({
   body: bodySchema
      .extend({
         name: z
            .string({
               required_error: "Name is required.",
            })
            .min(4, "Name must have at least 4 characters."),
         confirmation: z.string({
            required_error: "Password confirmation is required.",
         }),
      })
      .refine((data) => data.password === data.confirmation, {
         message: "Passwords do not match.",
         path: ["confirmation"],
      }),
});

const updateSchema = z.object({
   body: bodySchema
      .extend({
         name: z.string().min(4, "Name must have at least 4 characters."),
      })
      .partial(),
});

export { loginSchema, registrationSchema, updateSchema };
