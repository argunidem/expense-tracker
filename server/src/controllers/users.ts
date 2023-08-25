import { NextFunction, Request, Response } from "express";
import { ApiResponse, RegistrationResponse } from "../interfaces/response";
import { RegistrationCredentials } from "../interfaces/user";
import { createUser } from "../services/user";
import User from "../models/user";

const register = async (
   req: Request<{}, RegistrationResponse, RegistrationCredentials>,
   res: Response<RegistrationResponse>,
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

const login = async (req: Request<{}, ApiResponse>, res: Response<ApiResponse>) => {
   res.status(200).json({
      status: "success",
      message: "Login",
   });
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
