import { Request } from "express";
import { UserDocument } from "./interfaces/user";

declare module "express" {
   export interface Request {
      user?: UserDocument | null;
   }
}

declare module "express-session" {
   export interface SessionData {
      user: Types.ObjectId;
   }
}
