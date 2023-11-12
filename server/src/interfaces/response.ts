import { UserWithoutPassword } from "./user/mongoose";
import { TransactionDocument } from "./transaction";
import { CategoryDocument } from "./category";

interface MessageResponse {
   status: "success";
   message: string;
}

interface UserResponse {
   status: "success";
   data: UserWithoutPassword;
}

interface TransactionResponse {
   status: "success";
   data: TransactionDocument;
}

interface ResultsResponse {
   status?: "success";
   count?: number;
   pagination?: {
      next?: { page: number; limit: number };
      prev?: { page: number; limit: number };
   };
   data: TransactionDocument[];
}

interface TransactionsResponse extends Omit<ResultsResponse, "data"> {
   data: {
      incomes: TransactionDocument[];
      expenses: TransactionDocument[];
   };
}

interface CategoryResponse {
   status: "success";
   data: CategoryDocument;
}

interface CategoriesResponse {
   status: "success";
   data: CategoryDocument[];
}

interface ErrorResponse {
   status: "fail";
   message: string;
   stack?: string | null;
}

export {
   MessageResponse,
   UserResponse,
   TransactionResponse,
   TransactionsResponse,
   CategoryResponse,
   CategoriesResponse,
   ResultsResponse,
   ErrorResponse,
};
