import { Document, Model } from "mongoose";
import * as z from "zod";
import { loginSchema, registrationSchema } from "../schemas/user";

//! email and password
type LoginCredentials = z.infer<typeof loginSchema>["body"];
//! name, email and password
type RegistrationCredentials = Omit<z.infer<typeof registrationSchema>["body"], "confirmation">;

//! mongoose methods
interface UserMethods {
   excludePassword(): UserWithoutPassword;
   matchPassword(inputPassword: string): Promise<boolean>;
}

interface UserDocument extends RegistrationCredentials, UserMethods, Document {}
interface UserWithoutPassword extends Omit<UserDocument, "password"> {}

interface UserModel extends Model<UserDocument, {}, UserMethods> {
   findByEmail(email: string): Promise<UserDocument | null>;
}

export { LoginCredentials, RegistrationCredentials, UserWithoutPassword, UserModel, UserDocument };
