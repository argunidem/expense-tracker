import { Request, Response } from "express";
import { ApiResponse } from "../interfaces/response";

const register = async (req: Request, res: Response<ApiResponse>) => {
   res.status(200).json({
      status: "success",
      message: "Register",
   });
};

const login = async (req: Request, res: Response<ApiResponse>) => {
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
