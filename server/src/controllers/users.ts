import { NextFunction, Request, Response } from "express";
import { ApiResponse, AuthResponse } from "../interfaces/response";
import { LoginCredentials, RegistrationCredentials } from "../interfaces/user";
import { createUser, loginUser } from "../services/user";

const register = async (
   req: Request<{}, AuthResponse, RegistrationCredentials>,
   res: Response<AuthResponse>,
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
   req: Request<{}, AuthResponse, LoginCredentials>,
   res: Response<AuthResponse>,
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

const logout = async (req: Request, res: Response<ApiResponse>) => {
   res.status(200).json({
      status: "success",
      message: "Log out",
   });
};

const profile = async (req: Request, res: Response<ApiResponse>) => {
   res.status(200).json({
      status: "success",
      message: "User profile",
   });
};

export { register, login, logout, profile };
