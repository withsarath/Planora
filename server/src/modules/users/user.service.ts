import User from "./user.schema";
import bcrypt from "bcrypt";

type Data = {
  name: string;
  email: string;
  password: string;
};

export async function getAllUserService() {
  return await User.find();
}
export async function getUserService(id: string) {
  return await User.findById(id);
}
export async function createUserService(data: Data) {
  const { name, email, password } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email is already exits");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "user",
  });

  return {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email
  }
}

export async function deleteUserService(id: string) {
  return User.findByIdAndDelete(id);
}
