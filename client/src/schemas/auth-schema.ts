import * as z from "zod";

const loginSchema = z.object({
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

const registrationSchema = z
   .object({
      name: z
         .string({
            required_error: "Name is required.",
         })
         .min(4, "Name must have at least 4 characters."),
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
      confirmation: z.string({
         required_error: "Password confirmation is required.",
      }),
   })
   .refine((data) => data.password === data.confirmation, {
      message: "Passwords do not match.",
      path: ["confirmation"],
   });

export type AuthValues = z.infer<typeof loginSchema> | z.infer<typeof registrationSchema>;

export { loginSchema, registrationSchema };
