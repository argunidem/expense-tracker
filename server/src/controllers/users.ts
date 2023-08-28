import { NextFunction, Request, Response } from "express";
import { ApiResponse, UserResponse } from "@/interfaces/response";
import { LoginCredentials, RegistrationCredentials, UserWithoutPassword } from "@/interfaces/user";
import { createUser, logoutUser, loginUser } from "@/services/user";

const register = async (
   req: Request<{}, UserResponse, RegistrationCredentials>,
   res: Response<UserResponse>,
   next: NextFunction
) => {
   try {
      const user = await createUser(req.body);
      req.session.user = user._id;

      res.status(201).json({
         status: "success",
         data: user,
      });
   } catch (error: any) {
      next(error);
   }
};

const login = async (
   req: Request<{}, UserResponse, LoginCredentials>,
   res: Response<UserResponse>,
   next: NextFunction
) => {
   try {
      const user = await loginUser(req.body);
      req.session.user = user._id;

      res.status(200).json({
         status: "success",
         data: user,
      });
   } catch (error: any) {
      next(error);
   }
};

const logout = (
   req: Request<{}, ApiResponse, {}>,
   res: Response<ApiResponse>,
   next: NextFunction
) => {
   logoutUser(req, () => {
      res.status(200).json({ status: "success", message: "Logout successful" });
   });
};

const profile = (
   req: Request<{}, UserResponse, {}>,
   res: Response<UserResponse>,
   next: NextFunction
) => {
   try {
      const user = req.user?.excludePassword();

      res.status(200).json({
         status: "success",
         data: user as UserWithoutPassword,
      });
   } catch (error: any) {
      next(error);
   }
};

export { register, login, logout, profile };
