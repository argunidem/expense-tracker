import { NextFunction, Request, Response } from "express";
import {
   createUser,
   logoutUser,
   getGoogleOauthTokens,
   getGoogleUser,
   loginUser,
   updateDetails,
} from "@/services/user";
import { ForbiddenError } from "@/utils/error";
import { handleBudgetOnAuth } from "@/utils/budget";
import { origin } from "@/config/variables";
import { MessageResponse, UserResponse } from "@/interfaces/response";
import {
   LoginCredentials,
   RegistrationCredentials,
   UpdateUserCredentials,
} from "@/interfaces/user/auth";
import { UserDocument, UserWithoutPassword } from "@/interfaces/user/mongoose";

//! Register user
//! POST /api/users/register
//! Public Route
const register = async (
   req: Request<{}, UserResponse, RegistrationCredentials>,
   res: Response<UserResponse>,
   next: NextFunction
) => {
   try {
      //- Create user and store user ID in session
      const user = await createUser(req.body);
      req.session.user = user._id;

      //- Create a new budget for the current month and calculate it if it doesn't exist
      await handleBudgetOnAuth(user._id);

      res.status(201).json({
         status: "success",
         data: user,
      });
   } catch (error: any) {
      next(error);
   }
};

//! Login user
//! POST /api/users/login
//! Public Route
const login = async (
   req: Request<{}, UserResponse, LoginCredentials>,
   res: Response<UserResponse>,
   next: NextFunction
) => {
   try {
      //- Log in user and store user ID in session
      const user = await loginUser(req.body);
      req.session.user = user._id;

      //- Create a new budget for the current month and calculate it if it doesn't exist
      await handleBudgetOnAuth(user._id);

      res.status(200).json({
         status: "success",
         data: user,
      });
   } catch (error: any) {
      next(error);
   }
};

//! Google OAuth
//! GET /api/users/oauth/google
//! Public Route
const googleOAuth = async (req: Request, res: Response, next: NextFunction) => {
   try {
      //- Obtain Google OAuth tokens
      const code = req.query.code as string;
      const { id_token, access_token } = await getGoogleOauthTokens({ code });

      //- Obtain Google user
      const googleUser = await getGoogleUser({ id_token, access_token });

      //- Check if Google account is verified
      if (!googleUser.verified_email) {
         return next(new ForbiddenError("Google account is not verified"));
      }

      //- Update or create user using Google account info
      const user = await updateDetails(
         {
            email: googleUser.email,
         },
         {
            email: googleUser.email,
            name: googleUser.name,
         },
         {
            upsert: true,
            new: true,
         }
      );

      //- Store user ID in session and redirect
      req.session.user = user._id;

      //- Create a new budget for the current month and calculate it if it doesn't exist
      await handleBudgetOnAuth(user._id);

      res.redirect(origin);
   } catch (error: any) {
      next(error);
   }
};

//! Logout user
//! POST /api/users/logout
//! Private Route
const logout = (req: Request<{}, MessageResponse, {}>, res: Response<MessageResponse>) => {
   //- Destroy session
   logoutUser(req, () => {
      res.status(200).json({ status: "success", message: "Logout successful" });
   });
   res.clearCookie("sid");
};

//! Get current user
//! POST /api/users/profile
//! Private Route
const profile = (
   req: Request<{}, UserResponse, {}>,
   res: Response<UserResponse>,
   next: NextFunction
) => {
   try {
      //- Exclude password from user
      const user = req.user?.excludePassword();

      res.status(200).json({
         status: "success",
         data: user as UserWithoutPassword,
      });
   } catch (error: any) {
      next(error);
   }
};

//! Update user details
//! PUT /api/users/update
//! Private
const updateUser = async (
   req: Request<{}, UserResponse, UpdateUserCredentials>,
   res: Response<UserResponse>,
   next: NextFunction
) => {
   try {
      const { email } = req.user as UserDocument;
      const fieldsToUpdate = req.body;

      const user = await updateDetails(
         {
            email,
         },
         {
            ...fieldsToUpdate,
         },
         {
            new: true,
            runValidators: true,
         }
      );

      res.status(200).json({
         status: "success",
         data: user,
      });
   } catch (error: any) {
      next(error);
   }
};

export { register, login, googleOAuth, logout, profile, updateUser };
