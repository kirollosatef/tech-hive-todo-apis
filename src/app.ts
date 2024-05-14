import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/user.routes";
import todoRoutes from "./routes/todo.routes";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

app.use(errorMiddleware);

export default app;
