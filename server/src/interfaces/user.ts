import { Document, Model } from "mongoose";
import * as z from "zod";
import { registrationSchema } from "../schemas/user";

interface RegistrationCredentials
   extends Omit<z.infer<typeof registrationSchema>["body"], "confirmation"> {}

interface UserWithId extends Pick<UserDocument, "_id" | "name" | "email"> {}

//. Model Interfaces
interface UserDocument extends RegistrationCredentials, Document {}

interface UserMethods {
   excludePassword(): UserWithId;
}

interface UserModel extends Model<UserDocument, {}, UserMethods> {
   findByEmail(email: string): Promise<UserDocument | null>;
}

export { RegistrationCredentials, UserWithId, UserModel, UserDocument };
