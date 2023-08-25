import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../interfaces/response";
import { ZodError } from "zod";

export const errorHandler = (
   err: any,
   req: Request,
   res: Response<ErrorResponse>,
   next: NextFunction
) => {
   let statusCode = err.statusCode || 500;
   let message = err.message;

   if (err instanceof ZodError) {
      statusCode = 400;
      message = err.errors[0].message || "Zod validation error";
   }

   res.status(statusCode).json({
      status: "fail",
      message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
   });
};
