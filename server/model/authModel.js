import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const authSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: Object,
      default: {},
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true, minimize: false }
);

authSchema.methods.comparePassword = function (loginPassword) {
  const isCorrect = bcrypt.compare(loginPassword, this.password);
  return isCorrect;
};

const User = model("User", authSchema);
export default User;
