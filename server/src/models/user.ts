import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { UserDocument, UserModel } from "@/interfaces/user/mongoose";

const userSchema = new Schema<UserDocument, UserModel>(
   {
      email: {
         type: String,
         required: true,
         unique: true,
      },
      name: {
         type: String,
         required: true,
      },
      password: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

//! Static method to find a user by email
userSchema.statics.findByEmail = function (email: string) {
   return this.findOne({ email });
};

//! Pre-save middleware to hash password
userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) return next();

   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);

   return next();
});

//! Method to exclude password field from user object
userSchema.methods.excludePassword = function () {
   const user = this.toObject();
   delete user.password;
   return user;
};

//! Method to match input password with stored hashed password
userSchema.methods.matchPassword = async function (inputPassword: string): Promise<boolean> {
   const { password } = this;
   return await bcrypt.compare(inputPassword, password);
};

const User = model<UserDocument, UserModel>("User", userSchema);

export default User;
