import type { Context } from "hono";
import { loginService, registerService } from "./auth.service.js";
import type { LoginInput, RegisterInput } from "./auth.types.js";

export const registerController = async (c: Context) => {
  try {
    const data = await c.req.json<RegisterInput>();
    const user = await registerService(data);

    return c.json(user, 201);
  } catch (err: any) {
    return c.json({ message: err.message }, 400);
  }
};

export const loginController = async (c: Context) => {
  try {
    const data = await c.req.json<LoginInput>();
    const result = await loginService(data);

    return c.json(result, 200);
  } catch (err: any) {
    return c.json({ message: err.message }, 400);
  }
};