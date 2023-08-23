export interface ApiResponse {
   status: "success" | "fail";
   message: string;
}

export interface ErrorResponse extends ApiResponse {
   stack?: string | null;
}
