# Plan: PATCH /tasks/:id/complete

## Status

Approved for implementation (Reviewer Round 1: Approved)
Date: 2026-03-19

## Goal

Add `PATCH /tasks/:id/complete` endpoint.

- Existing task → set `completed: true`, return 200 + updated task
- Unknown id → return 404 + `{ error: "task not found" }`
- No changes to `POST /tasks` or `GET /tasks` behavior
- Storage remains in-memory

## Affected Files

| File | Change |
|------|--------|
| `src/store/taskStore.ts` | Add `findTaskById(id): Task \| undefined` |
| `src/services/tasksService.ts` | Add `completeTask(id): Task \| null` |
| `src/controllers/tasksController.ts` | Add `patchTaskComplete(req, res): void` |
| `src/routes/tasks.ts` | Register `PATCH /:id/complete` |
| `docs/spec.md` | Remove "Update endpoints" from Out of Scope; add PATCH section |
| `tests/tasks.test.ts` | Add 2 new test cases |

No changes to: `src/types/task.ts`, `src/app.ts`, `src/server.ts`, `src/validators/taskValidator.ts`

## Key Design

- `findTaskById` returns direct array reference (not a copy) to allow in-place mutation
- `completeTask` returns `Task | null` — `null` signals not-found
- Controller uses strict `=== null` check (not falsy)
- Idempotent: calling PATCH on already-completed task returns 200 (no-op)
- Error message: `"task not found"` (matches existing lowercase short-phrase convention)

## Implementation Steps (ordered)

1. `src/store/taskStore.ts` — add `findTaskById`
2. `src/services/tasksService.ts` — add `completeTask`
3. `src/controllers/tasksController.ts` — add `patchTaskComplete`
4. `src/routes/tasks.ts` — register `PATCH /:id/complete`
5. `docs/spec.md` — remove "Update endpoints" from Out of Scope; add PATCH section
6. `tests/tasks.test.ts` — add happy path test and 404 test

Steps 1–4 must run in order (layer dependency).
Steps 5–6 are independent of each other.

## Validation Checklist

- [ ] `PATCH /tasks/t_1/complete` after POST returns 200 + `{ id, title, completed: true }`
- [ ] `PATCH /tasks/t_999/complete` (empty store) returns 404 + `{ error: "task not found" }`
- [ ] `POST /tasks` still returns 201 with `completed: false`
- [ ] `GET /tasks` reflects `completed: true` after PATCH
- [ ] All 5 tests pass (3 existing + 2 new)
- [ ] `docs/spec.md` no longer lists "Update endpoints" under Out of Scope
