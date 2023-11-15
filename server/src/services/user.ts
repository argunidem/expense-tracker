import { NextFunction, Request } from "express";
import { FilterQuery, QueryOptions } from "mongoose";
import axios from "axios";
import { stringify } from "qs";
import User from "@/models/user";
import Category from "@/models/category";
import { AuthenticationError, BaseError, ConflictError, NotFoundError } from "@/utils/error";
import { googleClientId, googleClientSecret, googleOauthRedirectUrl } from "@/config/variables";
import {
   LoginCredentials,
   RegistrationCredentials,
   GoogleTokensResponse,
   GoogleUserResponse,
   UpdateUserCredentials,
} from "@/interfaces/user/auth";
import { UserDocument, UserWithoutPassword } from "@/interfaces/user/mongoose";

const createUser = async (credentials: RegistrationCredentials): Promise<UserWithoutPassword> => {
   try {
      //- Check if user already exists
      const userExists = await User.findByEmail(credentials.email);
      if (userExists) throw new ConflictError();

      //- Create user and return without password
      const user = await User.create(credentials);

      //- Create default category named "Other"
      await Category.create({
         name: "Other",
         user: user._id,
      });

      return user.excludePassword();
   } catch (error: any) {
      throw error;
   }
};

const loginUser = async (credentials: LoginCredentials): Promise<UserWithoutPassword> => {
   try {
      const { email, password } = credentials;

      //- Find user by email
      const user = await User.findByEmail(email);
      if (!user) throw new NotFoundError("User");

      //- Check password match and return user without password
      const isMatch = await user.matchPassword(password);
      if (!isMatch) throw new AuthenticationError("Invalid credentials.");

      return user.excludePassword();
   } catch (error) {
      throw error;
   }
};

const getGoogleOauthTokens = async ({ code }: { code: string }): Promise<GoogleTokensResponse> => {
   //- Google OAuth token endpoint
   const url = "https://oauth2.googleapis.com/token";

   //- Prepare request values
   const values = {
      code,
      client_id: googleClientId,
      client_secret: googleClientSecret,
      redirect_uri: googleOauthRedirectUrl,
      grant_type: "authorization_code",
   };

   try {
      //- Send a POST request to get Google OAuth tokens
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

//! Get Google user information
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
   //- Destroy session
   req.session.destroy((err: any) => {
      if (err) {
         //- Log and handle session destruction error
         console.error("Error destroying session:", err);
         return next(new BaseError(500, "Internal server error"));
      }

      //- Log and handle session destruction error
      req.user = null;
      next();
   });
};

const updateDetails = async (
   query: FilterQuery<UserDocument>,
   update: UpdateUserCredentials,
   options: QueryOptions = {}
): Promise<UserWithoutPassword> => {
   let user;

   //- Check if updated email already exists
   if (update.email && !options.upsert) {
      const userExists = await User.findByEmail(update.email);
      if (userExists && update.email !== query.email) throw new ConflictError();
   }

   //- If updating password
   if (update.password) {
      //- Find user, update password, and exclude password before returning
      user = await User.findOne(query);
      if (!user) throw new NotFoundError("User");

      user.set(update);

      //- Trigger the pre-save middleware to hash the password
      await user.save();

      user = user.excludePassword();
   } else {
      //- Update user details and exclude password from result
      user = await User.findOneAndUpdate(query, update, options).select("-password");
   }

   return user as UserWithoutPassword;
};

export { createUser, loginUser, getGoogleOauthTokens, logoutUser, updateDetails };
