import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "@/utils/error";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
   const error = new NotFoundError(`Route Not Found - ${req.originalUrl}`);
   next(error);
};
