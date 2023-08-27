import { UserWithoutPassword } from "./user";

export interface ApiResponse {
   status: "success";
   message: string;
}

export interface AuthResponse {
   status: "success";
   data: UserWithoutPassword;
}

export interface ErrorResponse {
   status: "fail";
   message: string;
   stack?: string | null;
}
