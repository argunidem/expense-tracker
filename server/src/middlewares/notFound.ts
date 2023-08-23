import { Request, Response, NextFunction } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
   res.status(404);
   const error = new Error(`Route Not Found - ${req.originalUrl}`);
   next(error);
};
