import type { Request, Response } from "express";
import { createTask, getTasks, updateTaskTitle } from "../services/tasksService.js";
import { validateCreateTaskInput, validatePatchTitleInput } from "../validators/taskValidator.js";

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

export function patchTaskTitle(req: Request, res: Response): void {
  const error = validatePatchTitleInput(req.body);
  if (error !== null) {
    res.status(400).json({ error });
    return;
  }

  const id = req.params.id as string;
  const title = (req.body as Record<string, unknown>).title as string;
  const task = updateTaskTitle(id, title.trim());

  if (task === null) {
    res.status(404).json({ error: "task not found" });
    return;
  }

  res.status(200).json(task);
}