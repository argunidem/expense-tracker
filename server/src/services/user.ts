import User from "../models/user";
import { RegistrationCredentials, UserWithId } from "../interfaces/user";

export const createUser = async (credentials: RegistrationCredentials): Promise<UserWithId> => {
   try {
      const user = await User.create(credentials);
      return user.excludePassword();
   } catch (error: any) {
      throw new Error(error);
   }
};
