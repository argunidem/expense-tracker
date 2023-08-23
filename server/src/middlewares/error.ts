import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../interfaces/error";

export function errorHandler(
   err: Error,
   req: Request,
   res: Response<ErrorResponse>,
   next: NextFunction
) {
   const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
   res.status(statusCode);
   res.json({
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
   });
}
