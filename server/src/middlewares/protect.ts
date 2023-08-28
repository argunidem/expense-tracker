import User from "@/models/user";
import { AuthenticationError } from "@/utils/error";
import { Request, Response, NextFunction } from "express";

export const protect = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const user = req.session.user;

      if (!user) {
         const error = new AuthenticationError(
            "Unauthorized: You must be logged in to access this resource."
         );
         return next(error);
      }

      req.user = await User.findById(user);

      next();
   } catch (error: any) {
      next(error);
   }
};
