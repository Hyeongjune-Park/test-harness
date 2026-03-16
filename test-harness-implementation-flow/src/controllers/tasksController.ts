import type { Request, Response } from "express";
import { createTask, getTasks } from "../services/tasksService.js";
import { validateCreateTaskInput } from "../validators/taskValidator.js";

export function postTask(req: Request, res: Response): void {
  const error = validateCreateTaskInput(req.body as { title?: string });

  if (error) {
    res.status(400).json({ error });
    return;
  }

  const task = createTask(req.body.title as string);
  res.status(201).json(task);
}

export function getTaskList(_req: Request, res: Response): void {
  const tasks = getTasks();
  res.status(200).json(tasks);
}