import { NextFunction, Request } from "express";
import { FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
import axios from "axios";
import { stringify } from "qs";
import User from "@/models/user";
import { AuthenticationError, BaseError, ConflictError, NotFoundError } from "@/utils/error";
import { googleClientId, googleClientSecret, googleOauthRedirectUrl } from "@/config/variables";
import {
   LoginCredentials,
   RegistrationCredentials,
   GoogleTokensResponse,
   GoogleUserResponse,
} from "@/interfaces/user/auth";
import { UserDocument, UserWithoutPassword } from "@/interfaces/user/mongoose";

const createUser = async (credentials: RegistrationCredentials): Promise<UserWithoutPassword> => {
   try {
      const userExists = await User.findByEmail(credentials.email);
      if (userExists) throw new ConflictError();

      const user = await User.create(credentials);
      return user.excludePassword();
   } catch (error: any) {
      throw error;
   }
};

const loginUser = async (credentials: LoginCredentials): Promise<UserWithoutPassword> => {
   try {
      const { email, password } = credentials;

      const user = await User.findByEmail(email);
      if (!user) throw new NotFoundError("User");

      const isMatch = await user.matchPassword(password);
      if (!isMatch) throw new AuthenticationError("Invalid credentials.");

      return user.excludePassword();
   } catch (error) {
      throw error;
   }
};

const getGoogleOauthTokens = async ({ code }: { code: string }): Promise<GoogleTokensResponse> => {
   const url = "https://oauth2.googleapis.com/token";

   const values = {
      code,
      client_id: googleClientId,
      client_secret: googleClientSecret,
      redirect_uri: googleOauthRedirectUrl,
      grant_type: "authorization_code",
   };

   try {
      const { data } = await axios.post<GoogleTokensResponse>(url, stringify(values), {
         headers: {
            "Content-Type": "application/x-www-form-urlencoded",
         },
      });
      return data;
   } catch (error: any) {
      console.error(error.response.data.error, "Failed to fetch google oauth tokens");
      throw new Error(error.message);
   }
};

export async function getGoogleUser({
   id_token,
   access_token,
}: Pick<GoogleTokensResponse, "id_token" | "access_token">): Promise<GoogleUserResponse> {
   try {
      const res = await axios.get<GoogleUserResponse>(
         `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
         {
            headers: {
               Authorization: `Bearer ${id_token}`,
            },
         }
      );
      return res.data;
   } catch (error: any) {
      console.error(error, "Error fetching Google user");
      throw new Error(error.message);
   }
}

const logoutUser = (req: Request, next: NextFunction) => {
   req.session.destroy((err: any) => {
      if (err) {
         console.error("Error destroying session:", err);
         return next(new BaseError(500, "Internal server error"));
      }

      req.user = null;
      next();
   });
};

const updateDetails = async (
   query: FilterQuery<UserDocument>,
   update: UpdateQuery<UserDocument>,
   options: QueryOptions = {}
): Promise<UserWithoutPassword> => {
   let user;

   //! If password is being updated
   if (update.password) {
      user = await User.findOne(query);
      if (!user) throw new NotFoundError("User");

      user.set(update);

      //! Trigger the pre save middleware to hash the password
      await user.save();

      user = user.excludePassword();
   } else {
      user = await User.findOneAndUpdate(query, update, options).select("-password");
   }

   return user as UserWithoutPassword;
};

export { createUser, loginUser, getGoogleOauthTokens, logoutUser, updateDetails };
