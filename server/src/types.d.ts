import { Request, Response } from "express";
import { Types } from "mongoose";
import { UserDocument } from "@/interfaces/user/mongoose";
import { IncomesResponse } from "./interfaces/response";

declare module "express" {
   export interface Request {
      user?: UserDocument | null;
   }
}

declare module "express" {
   export interface Response {
      results?: IncomesResponse;
   }
}

declare module "express-session" {
   export interface SessionData {
      user: typeof Types.ObjectId;
   }
}
