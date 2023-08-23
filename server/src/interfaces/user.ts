import { Document } from "mongoose";

interface UserCredentials {
   email: string;
   name: string;
   password: string;
}

interface UserDocument extends UserCredentials, Document {}

export { UserCredentials, UserDocument };
