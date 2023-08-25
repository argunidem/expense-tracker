import { Request, Response } from "express";
import { ApiResponse } from "../interfaces/response";
import { LoginCredentials, RegistrationCredentials } from "../interfaces/user";

const register = async (
   req: Request<{}, ApiResponse, RegistrationCredentials>,
   res: Response<ApiResponse>
) => {
   res.status(200).json({
      status: "success",
      message: "Register",
   });
};

const login = async (
   req: Request<{}, ApiResponse, LoginCredentials>,
   res: Response<ApiResponse>
) => {
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
