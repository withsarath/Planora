import { Hono } from "hono";
import { loginController, registerController } from "./auth.controller.js";

export const authRoute = new Hono();

authRoute.post("/register", registerController);
authRoute.post("/login", loginController);