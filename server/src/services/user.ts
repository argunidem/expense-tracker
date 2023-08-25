import User from "../models/user";
import { RegistrationCredentials, UserWithId } from "../interfaces/user";
import { ConflictError } from "../utils/error";

export const createUser = async (credentials: RegistrationCredentials): Promise<UserWithId> => {
   try {
      const userExists = await User.findByEmail(credentials.email);
      if (userExists) throw new ConflictError();

      const user = await User.create(credentials);
      return user.excludePassword();
   } catch (error: any) {
      throw error;
   }
};
