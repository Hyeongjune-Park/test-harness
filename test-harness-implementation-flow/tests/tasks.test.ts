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

  describe("PATCH /tasks/:id/title", () => {
    it("updates title of existing task", async () => {
      await request(app).post("/tasks").send({ title: "Buy milk" });

      const response = await request(app)
        .patch("/tasks/t_1/title")
        .send({ title: "Walk dog" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: "t_1",
        title: "Walk dog",
        completed: false
      });
    });

    it("returns 404 for non-existent id", async () => {
      const response = await request(app)
        .patch("/tasks/t_999/title")
        .send({ title: "Walk dog" });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "task not found" });
    });

    it("returns 400 for missing title field", async () => {
      await request(app).post("/tasks").send({ title: "Buy milk" });

      const response = await request(app)
        .patch("/tasks/t_1/title")
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "title is required" });
    });

    it("returns 400 for null title", async () => {
      await request(app).post("/tasks").send({ title: "Buy milk" });

      const response = await request(app)
        .patch("/tasks/t_1/title")
        .send({ title: null });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "title must be a string" });
    });

    it("returns 400 for numeric title", async () => {
      await request(app).post("/tasks").send({ title: "Buy milk" });

      const response = await request(app)
        .patch("/tasks/t_1/title")
        .send({ title: 42 });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "title must be a string" });
    });

    it("returns 400 for empty string title", async () => {
      await request(app).post("/tasks").send({ title: "Buy milk" });

      const response = await request(app)
        .patch("/tasks/t_1/title")
        .send({ title: "" });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "title must not be empty" });
    });

    it("returns 400 for whitespace-only title", async () => {
      await request(app).post("/tasks").send({ title: "Buy milk" });

      const response = await request(app)
        .patch("/tasks/t_1/title")
        .send({ title: "   " });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "title must not be empty" });
    });

    it("trims title before storing", async () => {
      await request(app).post("/tasks").send({ title: "Buy milk" });

      const response = await request(app)
        .patch("/tasks/t_1/title")
        .send({ title: "  Walk dog  " });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: "t_1",
        title: "Walk dog",
        completed: false
      });
    });

    it("preserves completed field after title update", async () => {
      // NOTE: Only verifies completed: false is not reset.
      // Preservation of completed: true requires PATCH /tasks/:id/complete (deferred).
      await request(app).post("/tasks").send({ title: "Buy milk" });

      const response = await request(app)
        .patch("/tasks/t_1/title")
        .send({ title: "Walk dog" });

      expect(response.status).toBe(200);
      expect(response.body.completed).toBe(false);
    });

    it("returns 400 (not 404) when body is invalid and id does not exist", async () => {
      const response = await request(app)
        .patch("/tasks/t_999/title")
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "title is required" });
    });
  });

  describe("malformed JSON body", () => {
    it("returns 400 for malformed JSON on POST /tasks", async () => {
      const response = await request(app)
        .post("/tasks")
        .set("Content-Type", "application/json")
        .send("not valid json{");

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "invalid json body" });
    });

    it("returns 400 for malformed JSON on PATCH /tasks/:id/title", async () => {
      const response = await request(app)
        .patch("/tasks/nonexistent-id/title")
        .set("Content-Type", "application/json")
        .send("not valid json{");

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "invalid json body" });
    });
  });
});
