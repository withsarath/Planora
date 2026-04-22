import { Hono } from "hono";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "./auth.controller.js";

const userRoutes = new Hono();

userRoutes.get("/", getAllUsers)
userRoutes.get("/", getUser)
userRoutes.post("/", createUser)
userRoutes.put("/", updateUser)
userRoutes.delete("/", deleteUser)

export default userRoutes;