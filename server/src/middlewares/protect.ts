import User from "@/models/user";
import { AuthenticationError } from "@/utils/error";
import { Request, Response, NextFunction } from "express";

//! Add user to request object
export const protect = async (req: Request, _res: Response, next: NextFunction) => {
   try {
      //- Check if user is logged in
      const user = req.session.user;

      if (!user) {
         const error = new AuthenticationError(
            "Unauthorized: You must be logged in to access this resource."
         );
         return next(error);
      }

      //- Add user to request object
      req.user = await User.findById(user);

      next();
   } catch (error: any) {
      next(error);
   }
};
