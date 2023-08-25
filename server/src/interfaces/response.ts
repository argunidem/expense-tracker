import { UserWithId } from "./user";

export interface ApiResponse {
   status: "success";
   message: string;
}

export interface RegistrationResponse {
   status: "success";
   data: UserWithId;
}

export interface ErrorResponse {
   status: "fail";
   message: string;
   stack?: string | null;
}
