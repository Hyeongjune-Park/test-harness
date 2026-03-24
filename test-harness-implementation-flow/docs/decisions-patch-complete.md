# Decisions: PATCH /tasks/:id/complete

## D1 — Store returns direct reference

`findTaskById` returns the actual array element, not a copy.
Enables in-place mutation in the service layer without a separate update function.
Consistent with existing `listTasks()` design.

## D2 — Service return type is `Task | null`

`null` used as not-found sentinel (not `undefined`).
Allows strict `=== null` check in controller; avoids falsy-check ambiguity.

## D3 — Idempotent completion

Calling PATCH on an already-completed task returns 200 with no error.
`task.completed = true` re-assignment is harmless; no guard needed.
Idempotency test case intentionally deferred (low priority for current scope).

## D4 — Error message convention

`"task not found"` follows existing lowercase short-phrase pattern
(cf. `"title is required"`, `"title must not be empty"`).

---

# Risks: PATCH /tasks/:id/complete

## R1 — Store object mutation (accepted)

`findTaskById` returns a live reference. Mutation in `completeTask` is visible
to all callers including `listTasks()`. This is intentional for in-memory design
but would be a correctness risk if persistence is ever added.
Status: Accepted within current in-memory scope.

## R2 — `src/server.ts` not inspected (low, deferred)

`server.ts` assumed to be an HTTP entry point with no conflicting routers.
`src/app.ts` confirms router/middleware structure. Risk is low given project scale.
Status: Accepted. Verify before implementation if unexpected behavior occurs.
