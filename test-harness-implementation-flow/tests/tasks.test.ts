import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { clearTasks } from "../src/store/taskStore.js";
import { resetTaskSequence } from "../src/services/tasksService.js";

describe("tasks api", () => {
  const app = createApp();

  beforeEach(() => {
    clearTasks();
    resetTaskSequence();
  });

  it("creates a task", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({ title: "Buy milk" });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: "t_1",
      title: "Buy milk",
      completed: false
    });
  });

  it("rejects empty title", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({ title: "" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "title must not be empty"
    });
  });

  it("lists tasks", async () => {
    await request(app).post("/tasks").send({ title: "Buy milk" });
    await request(app).post("/tasks").send({ title: "Walk dog" });

    const response = await request(app).get("/tasks");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: "t_1",
        title: "Buy milk",
        completed: false
      },
      {
        id: "t_2",
        title: "Walk dog",
        completed: false
      }
    ]);
  });
});