import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "@/interfaces/response";
import { ZodError } from "zod";
import mongoose from "mongoose";

export const errorHandler = (
   err: any,
   _req: Request,
   res: Response<ErrorResponse>,
   _next: NextFunction
) => {
   let statusCode = err.statusCode || 500;
   let message = err.message;

   //- Handle Zod validation error
   if (err instanceof ZodError) {
      statusCode = 400;
      message = err.errors[0].message || "Zod validation error";
   }

   //- Handle CastError
   if (err instanceof mongoose.Error.CastError) {
      statusCode = 400;
      message = `Invalid ${err.kind}: ${err.value}`;
   }

   res.status(statusCode).json({
      status: "fail",
      message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
   });
};
