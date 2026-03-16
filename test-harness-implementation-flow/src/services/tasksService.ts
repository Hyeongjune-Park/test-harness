import { insertTask, listTasks } from "../store/taskStore.js";
import type { Task } from "../types/task.js";

let nextId = 1;

export function createTask(title: string): Task {
  const task: Task = {
    id: `t_${nextId++}`,
    title,
    completed: false
  };

  return insertTask(task);
}

export function getTasks(): Task[] {
  return listTasks();
}

export function resetTaskSequence(): void {
  nextId = 1;
}