import User from "@/models/user";
import { LoginCredentials, RegistrationCredentials, UserWithoutPassword } from "@/interfaces/user";
import { AuthenticationError, ConflictError, NotFoundError } from "@/utils/error";

export const createUser = async (
   credentials: RegistrationCredentials
): Promise<UserWithoutPassword> => {
   try {
      const userExists = await User.findByEmail(credentials.email);
      if (userExists) throw new ConflictError();

      const user = await User.create(credentials);
      return user.excludePassword();
   } catch (error: any) {
      throw error;
   }
};

export const loginUser = async (credentials: LoginCredentials): Promise<UserWithoutPassword> => {
   try {
      const { email, password } = credentials;

      const user = await User.findByEmail(email);
      if (!user) throw new NotFoundError("User");

      const isMatch = await user.matchPassword(password);
      if (!isMatch) throw new AuthenticationError();

      return user.excludePassword();
   } catch (error) {
      throw error;
   }
};
