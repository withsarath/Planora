import type { Context } from "hono";
import * as userService from "./user.service";
import User from "./user.schema";

export async function getAllUsers(c: Context) {
  try {
    const users = await userService.getAllUserService();
    return c.json(users, 200);
  } catch (error) {
    return c.json({ message: "Internal server error" }, 500);
  }
}
export async function getUser(c: Context) {
  try {
    const id = c.req.param("id");
    if (!id) {
      return c.json({ message: "id is required" }, 400);
    }
    const user = await userService.getUserService(id);
    if (!user) {
      return c.json({ message: "User not found" }, 404);
    }
    return c.json(user, 200);
  } catch (error) {
    return c.json({ message: "Internal server error" }, 500);
  }
}
export async function createUser(c: Context) {
  try {
    const { name, email, password } = await c.req.json();

    if (!name || !email || !password) {
      return c.json({ message: "Properties missing" },400);
    }

    const user = await userService.createUserService({
      name,
      email,
      password,
    });
    
    return c.json(user, 201);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  }
}
export async function updateUser(c: Context) {
    try {
        
    } catch (error) {
        
    }
}

export async function deleteUser(c: Context) {
  try {
    const id = c.req.param("id");
    if (!id) {
      return c.json({ message: "Id not exists" });
    }
    const user = await userService.deleteUserService(id);
    return c.json(user, 200);
  } catch (error) {
    return c.json({ message: "Internal server error" }, 500);
  }
}
