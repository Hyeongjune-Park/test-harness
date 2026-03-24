# Plan: PATCH /tasks/:id/title

## Status

Implemented and reviewed (2026-03-24)
- Planning: Reviewer Round 2 Approved
- Implementation: completed 2026-03-24
- Implementation review: Approved
- Code review: Approved (13/13 tests pass)

## Goal

Add `PATCH /tasks/:id/title` endpoint.

- Existing task + valid title → update title in place, return 200 + full task shape
- Unknown id → return 404 + `{ error: "task not found" }`
- Invalid body → return 400 + `{ error: "<validation message>" }` (validation runs before store lookup)
- Storage remains in-memory

## Affected Files

| File | Change |
|------|--------|
| `src/store/taskStore.ts` | Add `findTaskById(id: string): Task \| null` |
| `src/services/tasksService.ts` | Add `updateTaskTitle(id: string, newTitle: string): Task \| null` |
| `src/validators/taskValidator.ts` | Add `validatePatchTitleInput(input: unknown): string \| null` |
| `src/controllers/tasksController.ts` | Add `patchTaskTitle(req, res): void` |
| `src/routes/tasks.ts` | Register `PATCH /:id/title` |
| `tests/tasks.test.ts` | Add 10 new test cases |
| `docs/spec.md` | Add `PATCH /tasks/:id/title` section; conditionally remove Out of Scope line |

No changes to: `src/app.ts`, `src/server.ts`, `src/types/task.ts`

## Key Design

- `findTaskById` returns direct array reference (`Task | null`) — enables in-place mutation; see decisions D2
- `updateTaskTitle` uses strict `=== null` check; does not re-validate title
- Validation runs before store lookup — invalid body on missing id returns 400, not 404
- Title trim at controller boundary; validator trim is for blank-check only (see D4)
- Error messages follow lowercase short-phrase convention (see D6)

## Validation Rules (`validatePatchTitleInput`)

Guard order (must not be reordered):

| # | Condition | Error message |
|---|---|---|
| 1 | `input` is not an object, is null, or is an array | `"request body must be an object"` |
| 2 | `title` key absent | `"title is required"` |
| 3 | `typeof title !== "string"` | `"title must be a string"` |
| 4 | `title.trim().length === 0` | `"title must not be empty"` |
| — | All pass | `null` |

## Response Shapes

- **200:** `{ "id": "t_1", "title": "new title", "completed": false }`
- **400:** `{ "error": "<validation message>" }`
- **404:** `{ "error": "task not found" }`

## Implementation Steps (ordered)

1. `src/store/taskStore.ts` — audit existing `findTaskById` (presence + type); add or correct
2. `src/services/tasksService.ts` — add `updateTaskTitle`
3. `src/validators/taskValidator.ts` — add `validatePatchTitleInput` *(parallel with step 2)*
4. `src/controllers/tasksController.ts` — add `patchTaskTitle`
5. `src/routes/tasks.ts` — register `PATCH /:id/title`
6. `docs/decisions-patch-title.md` — already created (independent)
7. `docs/spec.md` — add endpoint section (unconditional); remove Out of Scope line (conditional)
8. `tests/tasks.test.ts` — add 9 test cases

Steps 1 → 2, 3 → 4 → 5 → 8 must run in order.
Steps 6, 7 are independent of code steps.

## Validation Checklist

- [x] `PATCH /tasks/t_1/title` → 200 + `{ id, title: <new>, completed: false }`
- [x] `GET /tasks` after PATCH reflects updated title
- [x] `PATCH /tasks/t_999/title` → 404 + `{ error: "task not found" }`
- [x] body `{}` → 400 + `{ error: "title is required" }`
- [x] body `{ title: null }` → 400 + `{ error: "title must be a string" }`
- [x] body `{ title: 42 }` → 400 + `{ error: "title must be a string" }`
- [x] body `{ title: "" }` → 400 + `{ error: "title must not be empty" }`
- [x] body `{ title: "   " }` → 400 + `{ error: "title must not be empty" }`
- [x] body `{}` + non-existent id → 400 (not 404)
- [x] body `{ title: "  x  " }` → 200 + `{ title: "x" }` (trim applied)
- [x] `completed` field unchanged after title patch (completed: false only; completed: true deferred — see follow-up F2)
- [x] Existing 3 tests pass without modification
- [x] `findTaskById` returns `Task | null` (not `undefined`) throughout
- [x] All `=== null` checks (no falsy checks)
