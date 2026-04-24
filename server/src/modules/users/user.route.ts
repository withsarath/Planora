import { Hono } from "hono";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "./user.controller.js";

const userRoutes = new Hono();

userRoutes.get("/", getAllUsers)
userRoutes.get("/", getUser)
userRoutes.post("/", createUser)
userRoutes.put("/", updateUser)
userRoutes.delete("/", deleteUser)

export default userRoutes;