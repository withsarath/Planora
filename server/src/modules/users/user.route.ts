import { Hono } from "hono";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "./user.controller.js";
import { verifyToken } from "../../middleware/authMiddleware.js";


const userRoutes = new Hono();

userRoutes.get("/me", verifyToken, (c) => {
  const user = c.get("user");

  return c.json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
});
userRoutes.get("/", getAllUsers)
userRoutes.get("/:id", getUser)
userRoutes.post("/", createUser)
userRoutes.patch("/:id", updateUser)
userRoutes.delete("/:id", deleteUser)

export default userRoutes;