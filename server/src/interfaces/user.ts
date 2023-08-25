import { Document } from "mongoose";
import * as z from "zod";
import { registrationSchema } from "../schemas/user";

interface RegistrationCredentials
   extends Omit<z.infer<typeof registrationSchema>["body"], "confirmation"> {}

interface LoginCredentials extends Omit<RegistrationCredentials, "name"> {}

interface UserDocument extends RegistrationCredentials, Document {}

export { RegistrationCredentials, LoginCredentials, UserDocument };
