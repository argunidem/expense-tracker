import { UserWithoutPassword } from "./user/mongoose";
import { ResourceDocument } from "./resource";

interface MessageResponse {
   status: "success";
   message: string;
}

interface UserResponse {
   status: "success";
   data: UserWithoutPassword;
}

interface ResourceResponse {
   status: "success";
   data: ResourceDocument;
}

interface ResultsResponse {
   success: "success";
   count: number;
   pagination: {
      next?: { page: number; limit: number };
      prev?: { page: number; limit: number };
   };
   data: any;
}

interface ErrorResponse {
   status: "fail";
   message: string;
   stack?: string | null;
}

export { MessageResponse, UserResponse, ResultsResponse, ResourceResponse, ErrorResponse };
