import { Request, Response } from "express";
import { Types } from "mongoose";
import { UserDocument } from "@/interfaces/user/mongoose";
import { ResultsResponse } from "./interfaces/response";

declare module "express" {
   export interface Request {
      user?: UserDocument | null;
   }
}

declare module "express" {
   export interface Response {
      results?: ResultsResponse;
   }
}

declare module "express-session" {
   export interface SessionData {
      user: typeof Types.ObjectId;
   }
}
