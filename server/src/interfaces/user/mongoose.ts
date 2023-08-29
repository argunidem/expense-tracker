import { Document, Model } from "mongoose";
import { RegistrationCredentials } from "./auth";

//! mongoose methods
interface UserMethods {
   excludePassword(): UserWithoutPassword;
   matchPassword(inputPassword: string): Promise<boolean>;
}

//! mongoose document
interface UserDocument extends RegistrationCredentials, UserMethods, Document {}
interface UserWithoutPassword extends Omit<UserDocument, "password"> {}

//! mongoose model
interface UserModel extends Model<UserDocument, {}, UserMethods> {
   findByEmail(email: string): Promise<UserDocument | null>;
}

export { UserMethods, UserDocument, UserWithoutPassword, UserModel };
