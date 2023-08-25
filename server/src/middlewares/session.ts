import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";

import { mongoUri } from "../config/variables";

declare module "express-session" {
   export interface SessionData {
      user: mongoose.Types.ObjectId;
   }
}

export const sessionSetup = (req: Request, res: Response, next: NextFunction) => {
   session({
      secret: "Replace with your secret key",
      resave: false,
      saveUninitialized: false,
      cookie: {
         maxAge: 1000 * 60 * 60 * 7,
      },
      store: MongoStore.create({
         mongoUrl: mongoUri,
      }),
   });

   next();
};
