import { Router } from "express";
import { getTaskList, postTask } from "../controllers/tasksController.js";

const tasksRouter = Router();

tasksRouter.post("/", postTask);
tasksRouter.get("/", getTaskList);

export { tasksRouter };