import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { connectDb } from "./config/database.js";
import "dotenv/config";
import { errorHandler } from "./middleware/errorHandler.js";
import { authRoute } from "./modules/auth/auth.route.js";
import userRoutes from "./modules/users/user.route.js";

const app = new Hono();
const PORT = Number(process.env.PORT) || 4000;
app.use("*", errorHandler);

app.get("/health", (c) => {
  return c.text("Health check!");
});
app.route("/auth", authRoute);
app.route("/users", userRoutes);

const startServer = async () => {
  try {
    await connectDb();
    serve({
      fetch: app.fetch,
      port: PORT,
    });
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (err) {
    console.error("Startup failed ❌", err);
    process.exit(1);
  }
};
startServer();
