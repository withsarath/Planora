import User from "../users/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { LoginInput, RegisterInput } from "./auth.types.js";

export const registerService = async (data: RegisterInput) => {
  const { name, email, password } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "user",
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };
};

export const loginService = async (data: LoginInput) => {
  const { email, password } = data;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing");
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return { token };
};
