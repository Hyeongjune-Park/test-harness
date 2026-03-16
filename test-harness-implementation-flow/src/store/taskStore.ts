import type { Task } from "../types/task.js";

const tasks: Task[] = [];

export function listTasks(): Task[] {
  return tasks;
}

export function insertTask(task: Task): Task {
  tasks.push(task);
  return task;
}

export function clearTasks(): void {
  tasks.length = 0;
}