import express, { Request, Response, NextFunction } from "express";
import { tasksRouter } from "./routes/tasks.js";

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use("/tasks", tasksRouter);

  app.use((err: Error, _req: Request, res: Response, next: NextFunction): void => {
    if (
      err instanceof SyntaxError &&
      (err as any).status === 400 &&
      (err as any).type === "entity.parse.failed"
    ) {
      res.status(400).json({ error: "invalid json body" });
      return;
    }
    next(err);
  });

  return app;
}