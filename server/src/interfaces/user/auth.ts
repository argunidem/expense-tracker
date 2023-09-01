import * as z from "zod";
import { loginSchema, registrationSchema } from "@/schemas/user";

//! Login request body - email and password
type LoginCredentials = z.infer<typeof loginSchema>["body"];
//! Registration request body - email, name, password, and confirmation
type RegistrationCredentials = Omit<z.infer<typeof registrationSchema>["body"], "confirmation">;

//! User with optional fields
type UpdateUserCredentials = Partial<RegistrationCredentials>;

//! Google OAuth tokens
interface GoogleTokensResponse {
   access_token: string;
   expires_in: number;
   refresh_token: string;
   scope: string;
   id_token: string;
}

//! Google OAuth user
interface GoogleUserResponse {
   id: string;
   email: string;
   verified_email: boolean;
   name: string;
   given_name: string;
   family_name: string;
   picture: string;
   locale: string;
}

export {
   LoginCredentials,
   RegistrationCredentials,
   UpdateUserCredentials,
   GoogleTokensResponse,
   GoogleUserResponse,
};
