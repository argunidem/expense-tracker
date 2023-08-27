import * as z from "zod";

export const bodySchema = z.object({
   email: z
      .string({
         required_error: "Email is required",
      })
      .email("Not a valid email"),
   password: z
      .string({
         required_error: "Password is required",
      })
      .min(6, "Password should be 6 characters minimum"),
});

export const loginSchema = z.object({
   body: bodySchema,
});

export const registrationSchema = z.object({
   body: bodySchema
      .extend({
         name: z
            .string({
               required_error: "Name is required",
            })
            .min(4, "Name should be 4 characters minimum"),
         confirmation: z.string({
            required_error: "Password confirmation is required",
         }),
      })
      .refine((data) => data.password === data.confirmation, {
         message: "Passwords do not match",
         path: ["confirmation"],
      }),
});
