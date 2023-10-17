export interface ProfileResponse {
   status: string;
   data: {
      _id: string;
      email: string;
      name: string;
      createdAt: string;
      updatedAt: string;
   };
}
