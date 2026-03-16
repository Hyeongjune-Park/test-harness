import express from "express";
import { tasksRouter } from "./routes/tasks.js";

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use("/tasks", tasksRouter);

  return app;
}