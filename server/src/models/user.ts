import { Schema, model } from "mongoose";
import { UserDocument } from "../interfaces/user";

const userSchema = new Schema(
   {
      email: { type: String, required: true, unique: true },
      name: { type: String, required: true },
      password: { type: String, required: true },
   },
   {
      timestamps: true,
   }
);

const User = model<UserDocument>("User", userSchema);

export default User;
