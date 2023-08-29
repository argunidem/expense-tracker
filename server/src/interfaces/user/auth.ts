import * as z from "zod";
import { loginSchema, registrationSchema } from "@/schemas/user";

//! email and password
type LoginCredentials = z.infer<typeof loginSchema>["body"];
//! name, email and password
type RegistrationCredentials = Omit<z.infer<typeof registrationSchema>["body"], "confirmation">;

//! user with optional fields
interface UpdateUserCredentials extends Partial<RegistrationCredentials> {}

//! google oauth tokens
interface GoogleTokensResponse {
   access_token: string;
   expires_in: number;
   refresh_token: string;
   scope: string;
   id_token: string;
}

//! google oauth user
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
