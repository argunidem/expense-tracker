import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

//! Validate request body, query, and params
export const validate =
   (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
      try {
         await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
         });
         return next();
      } catch (error) {
         next(error);
      }
   };
