import { UserWithoutPassword } from "./user/mongoose";

export interface ApiResponse {
   status: "success";
   message: string;
}

export interface UserResponse {
   status: "success";
   data: UserWithoutPassword;
}

export interface ErrorResponse {
   status: "fail";
   message: string;
   stack?: string | null;
}
