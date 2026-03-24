import { Router } from "express";
import { getTaskList, patchTaskTitle, postTask } from "../controllers/tasksController.js";

const tasksRouter = Router();

tasksRouter.post("/", postTask);
tasksRouter.get("/", getTaskList);
tasksRouter.patch("/:id/title", patchTaskTitle);

export { tasksRouter };