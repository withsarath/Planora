import type { Context, Next } from "hono";
import jwt from "jsonwebtoken";
import User from "../modules/users/user.schema.js";

export const verifyToken = async (c: Context, next: Next) => {
  try {
    const authHeader = c.req.header("Authorization");

    if (!authHeader || typeof authHeader !== "string") {
      throw new Error("No token provided");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new Error("Invalid token format");
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET missing");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: string;
    };

    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new Error("User not found");
    }
    c.set("user", user);

    await next();
  } catch (err: any) {
    return c.json({ message: err.message }, 401);
  }
};
