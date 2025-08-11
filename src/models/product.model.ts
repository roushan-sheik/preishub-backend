import { Schema, model } from "mongoose";
import { TUser } from "../interfaces/user.interface";

const productSchema = new Schema<TUser>({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: 0,
  },
  refreshToken: {
    type: String,
    select: false,
  },
  passwordChangedAt: {
    type: Date,
  },
});

const User = model<TUser>("Product", productSchema);

export default User;
