import { UserWithoutPassword } from "./user/mongoose";
import { IncomeDocument } from "./income";

interface ApiResponse {
   status: "success";
   message: string;
}

interface UserResponse {
   status: "success";
   data: UserWithoutPassword;
}

interface IncomeResponse {
   status: "success";
   data: IncomeDocument;
}

interface IncomesResponse {
   status: "success";
   data: IncomeDocument[];
}

interface ErrorResponse {
   status: "fail";
   message: string;
   stack?: string | null;
}

export { ApiResponse, UserResponse, ErrorResponse, IncomeResponse, IncomesResponse };
