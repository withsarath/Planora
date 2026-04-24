import { Hono } from "hono";

const authRoute = new Hono();

authRoute.post("/register", registerController);
authRoute.post("/login", loginController);